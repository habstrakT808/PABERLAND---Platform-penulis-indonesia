// src/lib/followOptimizations.ts
import { supabase } from './supabase';
import { followHelpers } from './supabase';

// Cache for follow status to reduce database calls
class FollowCache {
  private cache = new Map<string, { isFollowing: boolean; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  getCacheKey(followerId: string, followingId: string): string {
    return `${followerId}:${followingId}`;
  }

  get(followerId: string, followingId: string): boolean | null {
    const key = this.getCacheKey(followerId, followingId);
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    // Check if cache is expired
    if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.isFollowing;
  }

  set(followerId: string, followingId: string, isFollowing: boolean): void {
    const key = this.getCacheKey(followerId, followingId);
    this.cache.set(key, {
      isFollowing,
      timestamp: Date.now()
    });
  }

  invalidate(followerId: string, followingId: string): void {
    const key = this.getCacheKey(followerId, followingId);
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const followCache = new FollowCache();

// Optimized follow helpers with caching
export const optimizedFollowHelpers = {
  async checkUserFollowCached(followerId: string, followingId: string): Promise<boolean> {
    // Check cache first
    const cached = followCache.get(followerId, followingId);
    if (cached !== null) {
      return cached;
    }

    // Fetch from database
    const { data, error } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .single();

    const isFollowing = !error && !!data;
    
    // Cache the result
    followCache.set(followerId, followingId, isFollowing);
    
    return isFollowing;
  },

  async toggleFollowOptimized(followerId: string, followingId: string) {
    const result = await followHelpers.toggleFollow(followerId, followingId);
    
    // Update cache
    if (result.success) {
      followCache.set(followerId, followingId, result.isFollowing);
    }
    
    return result;
  },

  // Batch follow status check for multiple users
  async batchCheckFollowStatus(followerId: string, targetUserIds: string[]): Promise<Map<string, boolean>> {
    const results = new Map<string, boolean>();
    const uncachedIds: string[] = [];

    // Check cache first
    for (const targetId of targetUserIds) {
      const cached = followCache.get(followerId, targetId);
      if (cached !== null) {
        results.set(targetId, cached);
      } else {
        uncachedIds.push(targetId);
      }
    }

    // Fetch uncached ones from database
    if (uncachedIds.length > 0) {
      const { data, error } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', followerId)
        .in('following_id', uncachedIds);

      if (!error && data) {
        const followingIds = new Set(data.map(f => f.following_id));
        
        for (const targetId of uncachedIds) {
          const isFollowing = followingIds.has(targetId);
          results.set(targetId, isFollowing);
          followCache.set(followerId, targetId, isFollowing);
        }
      }
    }

    return results;
  }
};

// Debounced follow action to prevent rapid clicking
export const debouncedFollowAction = (() => {
  const pending = new Map<string, Promise<any>>();

  return async (followerId: string, followingId: string) => {
    const key = `${followerId}:${followingId}`;
    
    // If there's already a pending request, return it
    if (pending.has(key)) {
      return pending.get(key);
    }

    // Create new request
    const request = optimizedFollowHelpers.toggleFollowOptimized(followerId, followingId)
      .finally(() => {
        // Remove from pending when done
        pending.delete(key);
      });

    pending.set(key, request);
    return request;
  };
})();