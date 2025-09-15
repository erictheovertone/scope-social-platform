"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import BottomToolbar from "@/components/BottomToolbar";
import { getProfile, getUserByPrivyId } from "@/lib/userService";

export default function Profile() {
  const router = useRouter();
  const { user } = usePrivy();
  const [isDataDropdownOpen, setIsDataDropdownOpen] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [userProfile, setUserProfile] = useState({
    displayName: "Eric",
    username: "overtone",
    bio: "I tell stories with visuals and sound.\nFilmmaker. Father. Anamorphic lover",
    profileImage: null as string | null
  });
  const [analytics, setAnalytics] = useState({
    value: 723123,
    volume24h: 18235,
    collectors: 1425,
    totalPosts: 242,
    followers: 12345,
    following: 122
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        // First try to get profile from Supabase
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
      }

      // Fallback to localStorage
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

      {/* VIEW DATA button - positioned inline with name */}
      <div className="absolute right-[10px] top-[82.5px] transform -translate-y-1/2 z-50">
        {!isDataDropdownOpen && (
          <button 
            onClick={() => setIsDataDropdownOpen(true)}
            className="font-['IBM_Plex_Mono'] font-medium text-white text-[12px] tracking-[-0.24px] leading-[1.4] cursor-pointer hover:opacity-80 bg-transparent border-none"
            style={{color: 'white'}}
          >
            VIEW DATA
          </button>
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
        <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[1.4]">
          {userProfile.displayName}
        </p>
      </div>

      {/* Handle */}
      <div className="absolute left-[97px] top-[96.5px] transform -translate-y-1/2">
        <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[9px] tracking-[-0.18px] leading-[1.4]">
          @{userProfile.username}
        </p>
      </div>

      {/* Bio */}
      <div className="absolute left-[97px] top-[146px] transform -translate-y-1/2">
        {userProfile.bio.split('\n').map((line, index) => (
          <p key={index} className="font-['IBM_Plex_Mono'] font-medium text-white text-[7px] tracking-[-0.14px] leading-[1.4] mb-0">
            {line}
          </p>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="absolute left-[4px] top-[234px] transform -translate-y-1/2">
        <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[9px] tracking-[-0.18px] leading-[1.4]">
          MAIN
        </span>
      </div>
      <div className="absolute left-[325px] top-[234px] transform -translate-y-1/2">
        <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[9px] tracking-[-0.18px] leading-[1.4]">
          COLLECTED
        </span>
      </div>

      {/* Create First Post Text */}
      <div className="absolute left-[115px] top-[428.5px] transform -translate-y-1/2">
        <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[8px] tracking-[-0.16px] leading-[1.4]">
          Create
        </p>
        <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[8px] tracking-[-0.16px] leading-[1.4]">
          your
        </p>
        <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[8px] tracking-[-0.16px] leading-[1.4]">
          first
        </p>
        <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[8px] tracking-[-0.16px] leading-[1.4]">
          post
        </p>
      </div>

      {/* Plus Sign SVG - Center of Page */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button 
          onClick={() => setShowCreatePost(true)}
          className="cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none p-0"
        >
          <img 
            src="/plus-icon.svg" 
            alt="Create Post" 
            className="w-[63px] h-[63px]"
          />
        </button>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center">
          <div className="bg-black border border-white w-[320px] h-[400px] p-6 relative">
            <button 
              onClick={() => setShowCreatePost(false)}
              className="absolute top-4 right-4 text-white text-xl cursor-pointer bg-transparent border-none"
            >
              ×
            </button>
            
            <h2 className="font-['IBM_Plex_Mono'] font-medium text-white text-[16px] tracking-[-0.32px] leading-[1.4] mb-6">
              Create Your First Post
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="font-['IBM_Plex_Mono'] font-medium text-white text-[12px] tracking-[-0.24px] leading-[1.4] block mb-2">
                  Upload Image/Video
                </label>
                <input 
                  type="file" 
                  accept="image/*,video/*"
                  className="w-full p-2 bg-transparent border border-white text-white text-sm"
                />
              </div>
              
              <div>
                <label className="font-['IBM_Plex_Mono'] font-medium text-white text-[12px] tracking-[-0.24px] leading-[1.4] block mb-2">
                  Caption
                </label>
                <textarea 
                  className="w-full h-20 p-2 bg-transparent border border-white text-white text-sm resize-none"
                  placeholder="Write your caption..."
                />
              </div>
              
              <div className="text-center pt-4">
                <button className="bg-[#FF0000] text-white px-6 py-2 font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[-0.24px] cursor-pointer hover:opacity-80">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <BottomToolbar />
    </div>
  );
}
