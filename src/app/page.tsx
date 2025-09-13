"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black relative w-[375px] h-[812px] mx-auto">
      {/* Red dot logo - clickable link to home */}
      <Link href="/">
        <div className="absolute left-[10px] top-[10px] w-[15px] h-[15px] cursor-pointer">
          <div className="w-[15px] h-[15px] bg-[#EF4444] rounded-full"></div>
        </div>
      </Link>

      {/* Feed Content - Mock user posts */}
      <div className="absolute left-[15px] top-[50px] w-[345px] h-[680px] overflow-y-auto">
        
        {/* User Post 1 */}
        <div className="mb-[30px] bg-[#1A1A1A] border border-[#333333] p-[15px]">
          <div className="flex items-center mb-[10px]">
            <div className="w-[30px] h-[30px] bg-[#333333] rounded-full mr-[10px]"></div>
            <div>
              <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[9px] tracking-[-0.18px] leading-[140%]">
                @creator1
              </p>
            </div>
          </div>
          <div className="w-full h-[200px] bg-[#333333] mb-[10px]"></div>
          <p className="font-['IBM_Plex_Mono'] font-normal text-[#CCCCCC] text-[8px] tracking-[-0.16px] leading-[140%]">
            Cinematic shot from my latest project
          </p>
        </div>

        {/* User Post 2 */}
        <div className="mb-[30px] bg-[#1A1A1A] border border-[#333333] p-[15px]">
          <div className="flex items-center mb-[10px]">
            <div className="w-[30px] h-[30px] bg-[#333333] rounded-full mr-[10px]"></div>
            <div>
              <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[9px] tracking-[-0.18px] leading-[140%]">
                @filmmaker2
              </p>
            </div>
          </div>
          <div className="w-full h-[150px] bg-[#333333] mb-[10px]"></div>
          <p className="font-['IBM_Plex_Mono'] font-normal text-[#CCCCCC] text-[8px] tracking-[-0.16px] leading-[140%]">
            Ultra-wide landscape composition
          </p>
        </div>

        {/* User Post 3 */}
        <div className="mb-[30px] bg-[#1A1A1A] border border-[#333333] p-[15px]">
          <div className="flex items-center mb-[10px]">
            <div className="w-[30px] h-[30px] bg-[#333333] rounded-full mr-[10px]"></div>
            <div>
              <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[9px] tracking-[-0.18px] leading-[140%]">
                @visualartist
              </p>
            </div>
          </div>
          <div className="w-full h-[180px] bg-[#333333] mb-[10px]"></div>
          <p className="font-['IBM_Plex_Mono'] font-normal text-[#CCCCCC] text-[8px] tracking-[-0.16px] leading-[140%]">
            Experimental grid layout design
          </p>
        </div>

      </div>

      {/* Bottom Navigation Toolbar */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-[#1A1A1A] border-t border-[#333333] flex items-center justify-around px-[20px]">
        
        {/* Home Icon */}
        <Link href="/">
          <div className="w-[24px] h-[24px] cursor-pointer">
            <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </div>
        </Link>

        {/* Create/Plus Icon */}
        <div className="w-[24px] h-[24px] cursor-pointer">
          <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </div>

        {/* Profile/Grid Icon */}
        <Link href="/profile">
          <div className="w-[24px] h-[24px] cursor-pointer">
            <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
            </svg>
          </div>
        </Link>

      </div>
    </div>
  );
}
