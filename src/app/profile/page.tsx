"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { getUserByPrivyId, getProfile } from "@/lib/userService";
import { getUserPosts } from '@/lib/postsService';
import CreatePostFlow from "@/components/CreatePostFlow";
import BottomToolbar from "@/components/BottomToolbar";
import Link from "next/link";

export default function Profile() {
  const { user } = usePrivy();
  const [isDataDropdownOpen, setIsDataDropdownOpen] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [isGearSpinning, setIsGearSpinning] = useState(false);
  const [userProfile, setUserProfile] = useState({
    displayName: "Eric",
    username: "overtone",
    bio: "I tell stories with visuals and sound.\nFilmmaker. Father. Anamorphic lover",
    profileImage: null as string | null
  });
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState({
    value: 723123,
    volume24h: 18235,
    collectors: 1425,
    totalPosts: 0,
    followers: 12345,
    following: 122
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        // Try to get profile from Supabase, but handle errors gracefully
        const supabaseUser = await getUserByPrivyId(user.id);
        if (supabaseUser) {
          const profile = await getProfile(supabaseUser.id);
          if (profile) {
            setUserProfile({
              displayName: profile.display_name || "Eric",
              username: profile.username || "overtone", 
              bio: profile.bio || "I tell stories with visuals and sound.\nFilmmaker. Father. Anamorphic lover",
              profileImage: profile.profile_image_url || null
            });
            return;
          }
        }
      } catch (error) {
        console.error('Error loading profile from Supabase:', error);
        // Continue to fallback instead of failing
      }

      // Fallback to localStorage or default values
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        try {
          const profileData = JSON.parse(savedProfile);
          setUserProfile(prev => ({
            ...prev,
            ...profileData
          }));
        } catch (error) {
          console.error('Error parsing saved profile data:', error);
        }
      }
    };

    loadProfile();
  }, [user]);

  const loadUserPosts = async () => {
    if (user?.id) {
      try {
        const posts = await getUserPosts(user.id);
        setUserPosts(posts);
      } catch (error) {
        console.error('Error loading user posts:', error);
      }
    }
  };

  useEffect(() => {
    loadUserPosts();
  }, [user, showCreatePost]); // Refresh when create post modal closes

  // Simulate real-time analytics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        value: prev.value + Math.floor(Math.random() * 100) - 50,
        volume24h: prev.volume24h + Math.floor(Math.random() * 50) - 25,
        collectors: prev.collectors + Math.floor(Math.random() * 5) - 2,
        followers: prev.followers + Math.floor(Math.random() * 3) - 1
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="bg-black relative w-[375px] h-[812px] mx-auto">
      {/* Red dot logo - positioned 10px from corners */}
      <div className="absolute left-[10px] top-[10px] w-[15px] h-[15px]">
        <div className="w-[15px] h-[15px] bg-[#FF0000] rounded-full"></div>
      </div>

      {/* Settings gear icon - positioned inline with name */}
      <div className="absolute right-[10px] top-[82.5px] transform -translate-y-1/2 z-50">
        {!isDataDropdownOpen && (
          <Link href="/profile/preferences">
            <button 
              onClick={() => {
                setIsGearSpinning(true);
                setTimeout(() => setIsGearSpinning(false), 600);
              }}
              className={`text-white text-[16px] cursor-pointer hover:opacity-80 bg-transparent border-none p-1 transition-transform duration-600 ${
                isGearSpinning ? 'animate-spin' : ''
              }`}
            >
              ⚙️
            </button>
          </Link>
        )}
        
        {/* Analytics Dropdown */}
        {isDataDropdownOpen && (
          <div className="absolute right-0 top-[20px] w-[280px] bg-black p-[20px] animate-in slide-in-from-top-4 duration-300 ease-out">
            <div className="grid grid-cols-2 gap-y-[4px]">
              {/* Left Column - Labels */}
              <div className="space-y-[4px]">
                <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] block">
                  Value
                </span>
                <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] block">
                  24h Volume
                </span>
                <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] block">
                  Collectors
                </span>
                <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] block">
                  Total Posts
                </span>
                <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] block">
                  Followers
                </span>
                <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] block">
                  Following
                </span>
                <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] block">
                  Performance
                </span>
              </div>
              
              {/* Right Column - Values */}
              <div className="space-y-[4px] text-right">
                <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] block">
                  ${formatNumber(analytics.value)}
                </span>
                <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] block">
                  ${formatNumber(analytics.volume24h)}
                </span>
                <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] block">
                  {formatNumber(analytics.collectors)}
                </span>
                <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] block">
                  {formatNumber(analytics.totalPosts)}
                </span>
                <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] block">
                  {formatNumber(analytics.followers)}
                </span>
                <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] block">
                  {formatNumber(analytics.following)}
                </span>
                <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] block">
                  &nbsp;
                </span>
              </div>
            </div>
            
            {/* Click anywhere to close */}
            <div 
              className="absolute inset-0 cursor-pointer" 
              onClick={() => setIsDataDropdownOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Profile Image */}
      <div className="absolute left-[10px] top-[76px] w-[80px] h-[80px] bg-[#333333] overflow-hidden">
        {userProfile.profileImage ? (
          <img 
            src={userProfile.profileImage} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#333333] flex items-center justify-center">
            <span className="text-white text-[30px] font-thin">+</span>
          </div>
        )}
      </div>

      {/* Name */}
      <div className="absolute left-[97px] top-[82.5px] transform -translate-y-1/2">
        <p style={{ fontFamily: 'TestSöhne-Halbfett, IBM Plex Mono, monospace' }} className="font-medium text-white text-[11px] tracking-[-0.22px] leading-[1.4]">
          {userProfile.displayName}
        </p>
      </div>

      {/* Handle */}
      <div className="absolute left-[97px] top-[96.5px] transform -translate-y-1/2">
        <p style={{ fontFamily: 'TestSöhne-Halbfett, IBM Plex Mono, monospace' }} className="font-medium text-white text-[9px] tracking-[-0.18px] leading-[1.4]">
          @{userProfile.username}
        </p>
      </div>

      {/* Bio */}
      <div className="absolute left-[97px] top-[146px] transform -translate-y-1/2">
        {userProfile.bio.split('\n').map((line, index) => (
          <p key={index} style={{ fontFamily: 'TestSöhne-Halbfett, IBM Plex Mono, monospace' }} className="font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] mb-0">
            {line}
          </p>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="absolute left-[4px] top-[234px] transform -translate-y-1/2">
        <span style={{ fontFamily: 'TestSöhne-Halbfett, IBM Plex Mono, monospace' }} className="font-medium text-white text-[9px] tracking-[-0.18px] leading-[1.4]">
          MAIN
        </span>
      </div>
      <div className="absolute left-[325px] top-[234px] transform -translate-y-1/2">
        <span style={{ fontFamily: 'TestSöhne-Halbfett, IBM Plex Mono, monospace' }} className="font-medium text-white text-[9px] tracking-[-0.18px] leading-[1.4]">
          COLLECTED
        </span>
      </div>

      {/* Posts Grid or Create First Post */}
      <div className="absolute left-[10px] top-[250px] w-[355px] h-[400px]">
        {userPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center mb-8">
              <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[8px] tracking-[-0.16px] leading-[1.4] mb-2">
                Create your first post
              </p>
            </div>
            <button 
              onClick={() => setShowCreatePost(true)}
              className="cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none p-0"
            >
              <div className="w-[63px] h-[63px] border-2 border-dashed border-[#333333] rounded-lg flex items-center justify-center">
                <span className="text-[#666666] text-2xl">+</span>
              </div>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 overflow-y-auto h-full auto-rows-min">
            {userPosts.map((post) => {
              // Determine grid span and aspect ratio based on layout
              const getLayoutClasses = (layoutId: string) => {
                switch (layoutId) {
                  case 'horizontal':
                    return {
                      gridClass: 'col-span-3',
                      aspectClass: 'aspect-[21/9]'
                    };
                  case 'grid3x1':
                    return {
                      gridClass: 'col-span-3',
                      aspectClass: 'aspect-[3/1]'
                    };
                  case 'vertical':
                    return {
                      gridClass: 'col-span-1 row-span-2',
                      aspectClass: 'aspect-[9/16]'
                    };
                  case 'grid2x2':
                    return {
                      gridClass: 'col-span-2 row-span-2',
                      aspectClass: 'aspect-square'
                    };
                  default: // single
                    return {
                      gridClass: 'col-span-1',
                      aspectClass: 'aspect-square'
                    };
                }
              };

              const { gridClass, aspectClass } = getLayoutClasses(post.layoutId);

              return (
                <div key={post.id} className={`${gridClass} ${aspectClass} bg-[#333333] rounded-sm overflow-hidden`}>
                  {post.mediaUrls && post.mediaUrls[0] && (
                    <img 
                      src={post.mediaUrls[0]} 
                      alt={post.caption || 'Post'} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Post Flow */}
      <CreatePostFlow 
        isOpen={showCreatePost} 
        onClose={() => setShowCreatePost(false)} 
      />

      
      <BottomToolbar />
    </div>
  );
}
