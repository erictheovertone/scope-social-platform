"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BottomToolbar from "@/components/BottomToolbar";
import Link from "next/link";

export default function Home() {
  // This is the home feed page - no redirect needed

  return (
    <div className="bg-black relative w-[375px] h-[812px] mx-auto">
      {/* Red dot logo - clickable link to home */}
      <Link href="/">
        <div className="absolute left-[10px] top-[10px] w-[15px] h-[15px] cursor-pointer">
          <div className="w-[15px] h-[15px] bg-[#FF0000] rounded-full"></div>
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

        {/* Logout/Gear Icon */}
        <Link href="/welcome">
          <div className="w-[24px] h-[24px] cursor-pointer">
            <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
              <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
            </svg>
          </div>
        </Link>

      </div>
      
      <BottomToolbar />
    </div>
  );
}
