'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-[15px] h-[15px] bg-[#FF0000] rounded-full mx-auto mb-4"></div>
        <h1 className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] tracking-[-0.28px] leading-[140%] mb-2">
          Page Not Found
        </h1>
        <Link href="/" className="font-['IBM_Plex_Mono'] font-normal text-[#CCCCCC] text-[11px] tracking-[-0.22px] leading-[140%] hover:text-white">
          Return Home
        </Link>
      </div>
    </div>
  );
}
