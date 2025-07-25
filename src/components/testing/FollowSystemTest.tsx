// src/components/testing/FollowSystemTest.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { followHelpers } from "@/lib/supabase";
import FollowButton from "@/components/social/FollowButton";
import toast from "react-hot-toast";

export default function FollowSystemTest() {
  const { user } = useAuth();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [testing, setTesting] = useState(false);

  const addResult = (result: string) => {
    setTestResults((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${result}`,
    ]);
  };

  const runTests = async () => {
    if (!user) {
      toast.error("Login required for testing");
      return;
    }

    setTesting(true);
    setTestResults([]);
    addResult("🚀 Starting Follow System Tests...");

    try {
      // Test 1: Get follow counts
      addResult("📊 Testing follow counts...");
      const counts = await followHelpers.getFollowCounts(user.id);
      addResult(
        `✅ Follow counts: ${counts.followersCount} followers, ${counts.followingCount} following`
      );

      // Test 2: Get recommendations
      addResult("🎯 Testing user recommendations...");
      const recommendations = await followHelpers.getRecommendedUsers(
        user.id,
        3
      );
      addResult(`✅ Found ${recommendations.length} recommendations`);

      // Test 3: Check follow status (self - should return false)
      addResult("🔍 Testing self-follow check...");
      const selfFollow = await followHelpers.checkUserFollow(user.id, user.id);
      addResult(
        `✅ Self-follow check: ${selfFollow ? "❌ ERROR" : "✅ CORRECT"}`
      );

      // Test 4: Get followers
      addResult("👥 Testing get followers...");
      const followers = await followHelpers.getUserFollowers(user.id, 5);
      addResult(`✅ Retrieved ${followers.length} followers`);

      // Test 5: Get following
      addResult("👤 Testing get following...");
      const following = await followHelpers.getUserFollowing(user.id, 5);
      addResult(`✅ Retrieved ${following.length} following`);

      addResult("🎉 All tests completed successfully!");
    } catch (error) {
      addResult(`❌ Test failed: ${error}`);
    } finally {
      setTesting(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  if (!user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          🧪 Follow System Testing
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Login required to run follow system tests.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        🧪 Follow System Testing
      </h3>

      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={runTests}
          disabled={testing}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {testing ? "Running Tests..." : "Run Tests"}
        </button>

        <button
          onClick={clearResults}
          className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Clear Results
        </button>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 max-h-96 overflow-y-auto">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Test Results:
          </h4>
          <div className="space-y-1 text-sm font-mono">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`${
                  result.includes("❌")
                    ? "text-red-600 dark:text-red-400"
                    : result.includes("✅")
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {result}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample Follow Buttons for Testing */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Sample Follow Buttons:
        </h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 w-20">
              Default:
            </span>
            <FollowButton
              targetUserId="sample-user-1"
              targetUserName="Sample User"
              size="md"
            />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 w-20">
              Outline:
            </span>
            <FollowButton
              targetUserId="sample-user-2"
              targetUserName="Sample User"
              size="md"
              variant="outline"
            />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 w-20">
              Small:
            </span>
            <FollowButton
              targetUserId="sample-user-3"
              targetUserName="Sample User"
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
