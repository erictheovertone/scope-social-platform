"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  return (
    <div className="bg-black relative w-[375px] h-[812px] mx-auto">
      {/* Red dot logo - positioned 10px from corners */}
      <div className="absolute left-[10px] top-[10px] w-[15px] h-[15px]">
        <div className="w-[15px] h-[15px] bg-[#EF4444] rounded-full"></div>
      </div>

      {/* VIEW BETA text - top right */}
      <div className="absolute right-[10px] top-[10px]">
        <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[8px] tracking-[-0.16px] leading-[140%]">
          VIEW BETA
        </span>
      </div>

      {/* User Profile Card */}
      <div className="absolute left-[15px] top-[50px] w-[345px] h-[100px] bg-[#1A1A1A] border border-[#333333]">
        {/* Profile Image */}
        <div className="absolute left-[15px] top-[15px] w-[70px] h-[70px] bg-[#333333] overflow-hidden">
          <img 
            src="/api/placeholder/70/70" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="absolute left-[100px] top-[15px]">
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%] mb-1">
            Eric
          </p>
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%] mb-1">
            @OVERTONE
          </p>
          <p className="font-['IBM_Plex_Mono'] font-normal text-[#CCCCCC] text-[9px] tracking-[-0.18px] leading-[140%] mb-2">
            1 of 1 stories with visuals and sound.
          </p>
          <p className="font-['IBM_Plex_Mono'] font-normal text-[#CCCCCC] text-[9px] tracking-[-0.18px] leading-[140%]">
            Filmmaker. Father. Adrenaline lover
          </p>
        </div>

        {/* Follower count */}
        <div className="absolute right-[15px] bottom-[15px] flex items-center">
          <div className="w-[15px] h-[15px] bg-white rounded-full mr-2"></div>
          <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[9px] tracking-[-0.18px] leading-[140%]">
            0 of 2.1k
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="absolute left-[15px] top-[170px] flex">
        <div className="mr-[40px]">
          <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%]">
            MAIN
          </span>
        </div>
        <div>
          <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%]">
            COLLECTED
          </span>
        </div>
      </div>

      {/* Create First Post Section */}
      <div className="absolute left-1/2 top-[400px] transform -translate-x-1/2 text-center">
        <div className="mb-[30px]">
          <div className="w-[60px] h-[60px] border border-white bg-transparent mx-auto flex items-center justify-center cursor-pointer">
            <span className="text-white text-[40px] font-thin select-none" style={{ lineHeight: '1' }}>+</span>
          </div>
        </div>
        <div className="text-left">
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%]">
            Create
          </p>
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%]">
            your
          </p>
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%]">
            first
          </p>
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%]">
            post
          </p>
        </div>
      </div>
    </div>
  );
}
