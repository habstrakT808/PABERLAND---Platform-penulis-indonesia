// src/app/profile/[id]/followers/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeftIcon,
  UsersIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { supabase, getAvatarUrl } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

interface FollowerData {
  id: string;
  follower_id: string;
  created_at: string;
  profiles: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    bio: string | null;
  };
}

export default function FollowersPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const profileId = params.id as string;

  const [profileData, setProfileData] = useState<any>(null);
  const [followers, setFollowers] = useState<FollowerData[]>([]);
  const [filteredFollowers, setFilteredFollowers] = useState<FollowerData[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (profileId) {
      fetchData();
    }
  }, [profileId]);

  useEffect(() => {
    // Filter followers based on search query
    if (searchQuery.trim()) {
      const filtered = followers.filter(
        (follower) =>
          follower.profiles.full_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (follower.profiles.bio &&
            follower.profiles.bio
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      );
      setFilteredFollowers(filtered);
    } else {
      setFilteredFollowers(followers);
    }
  }, [searchQuery, followers]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch profile data
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .eq("id", profileId)
        .single();

      if (profileError || !profile) {
        console.error("Profile not found:", profileError);
        router.push("/penulis");
        return;
      }

      setProfileData(profile);

      // Fetch followers
      const { data: followersData, error: followersError } = await supabase
        .from("follows")
        .select(
          `
          id,
          follower_id,
          created_at,
          profiles!follows_follower_id_fkey (
            id,
            full_name,
            avatar_url,
            bio
          )
        `
        )
        .eq("following_id", profileId)
        .order("created_at", { ascending: false })
        .limit(100);

      if (followersError) {
        console.error("Error fetching followers:", followersError);
        toast.error("Gagal memuat data pengikut");
        return;
      }

      setFollowers(followersData as unknown as FollowerData[]);
      setFilteredFollowers(followersData as unknown as FollowerData[]);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Gagal memuat data pengikut");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Profil Tidak Ditemukan
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Profil yang Anda cari tidak ditemukan.
          </p>
          <Link
            href="/penulis"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Kembali ke Direktori Penulis
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Link
                href="/"
                className="hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Beranda
              </Link>
              <span>/</span>
              <Link
                href={`/profile/${profileId}`}
                className="hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {profileData.full_name}
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-medium">
                Pengikut
              </span>
            </nav>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Pengikut {profileData.full_name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {filteredFollowers.length} pengikut
            </p>
          </div>

          <Link
            href={`/profile/${profileId}`}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Kembali ke Profil</span>
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pengikut..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Followers List */}
        {filteredFollowers.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
            <UsersIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery.trim() ? "Tidak Ada Hasil" : "Belum Ada Pengikut"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery.trim()
                ? "Tidak ditemukan pengikut yang sesuai dengan pencarian."
                : `${profileData.full_name} belum memiliki pengikut.`}
            </p>
            {searchQuery.trim() && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Lihat Semua Pengikut
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFollowers.map((follower) => (
              <div
                key={follower.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <Link
                    href={`/profile/${follower.follower_id}`}
                    className="flex-shrink-0"
                  >
                    {follower.profiles.avatar_url ? (
                      <Image
                        src={getAvatarUrl(follower.profiles.avatar_url) || ""}
                        alt={follower.profiles.full_name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {follower.profiles.full_name.charAt(0)}
                      </div>
                    )}
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/profile/${follower.follower_id}`}
                      className="text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block"
                    >
                      {follower.profiles.full_name}
                    </Link>
                    {follower.profiles.bio && (
                      <p className="text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                        {follower.profiles.bio}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Mengikuti sejak {formatDate(follower.created_at)}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    {/* Follow button removed for now */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
