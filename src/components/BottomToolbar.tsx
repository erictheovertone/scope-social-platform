"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export default function BottomToolbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = useCallback((path: string) => {
    // Add smooth transition and prevent unnecessary navigation
    if (pathname !== path) {
      router.push(path);
    }
  }, [router, pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 w-[375px] h-[60px] flex items-center justify-around px-[20px] z-50 bg-[#1A1A1A] border-t border-[#333333]" style={{top: '700px'}}>
      {/* Home Icon */}
      <button 
        onClick={() => handleNavigation('/')}
        className={`flex items-center justify-center cursor-pointer hover:opacity-80 bg-transparent border-none p-2 transition-all duration-200 ${
          isActive('/') ? 'opacity-100 scale-110' : 'opacity-70'
        }`}
        aria-label="Home"
      >
        <svg width="13.5" height="13.5" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.375 10.125L13.5 3.375L23.625 10.125V22.5C23.625 23.0967 23.3879 23.669 22.9597 24.0972C22.5315 24.5254 21.9592 24.7625 21.3625 24.7625H5.6375C5.04076 24.7625 4.46851 24.5254 4.04029 24.0972C3.61207 23.669 3.375 23.0967 3.375 22.5V10.125Z" stroke={isActive('/') ? '#FF0000' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.125 24.7625V13.5H16.875V24.7625" stroke={isActive('/') ? '#FF0000' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Create Post Icon */}
      <button 
        onClick={() => handleNavigation('/create')}
        className={`flex items-center justify-center cursor-pointer hover:opacity-80 bg-transparent border-none p-2 transition-all duration-200 ${
          isActive('/create') ? 'opacity-100 scale-110' : 'opacity-70'
        }`}
        aria-label="Create Post"
      >
        <svg width="13.5" height="13.5" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 5.0625V21.9375M5.0625 13.5H21.9375" stroke={isActive('/create') ? '#FF0000' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Profile Icon */}
      <button 
        onClick={() => handleNavigation('/profile')}
        className={`flex items-center justify-center cursor-pointer hover:opacity-80 bg-transparent border-none p-2 transition-all duration-200 ${
          isActive('/profile') ? 'opacity-100 scale-110' : 'opacity-70'
        }`}
        aria-label="Profile"
      >
        <svg width="13.5" height="13.5" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.25 23.625V21.375C20.25 20.1815 19.7759 19.0370 18.9331 18.1942C18.0903 17.3514 16.9458 16.875 15.75 16.875H11.25C10.0542 16.875 8.90973 17.3514 8.06694 18.1942C7.22414 19.0370 6.75 20.1815 6.75 21.375V23.625" stroke={isActive('/profile') ? '#FF0000' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.5 12.375C15.9853 12.375 18 10.3603 18 7.875C18 5.38972 15.9853 3.375 13.5 3.375C11.0147 3.375 9 5.38972 9 7.875C9 10.3603 11.0147 12.375 13.5 12.375Z" stroke={isActive('/profile') ? '#FF0000' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Wallet Icon */}
      <button 
        onClick={() => handleNavigation('/wallet')}
        className={`flex items-center justify-center cursor-pointer hover:opacity-80 bg-transparent border-none p-2 transition-all duration-200 ${
          isActive('/wallet') ? 'opacity-100 scale-110' : 'opacity-70'
        }`}
        aria-label="Wallet"
      >
        <svg width="13" height="13" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.75 6.5H3.25C2.42157 6.5 1.75 7.17157 1.75 8V20.5C1.75 21.3284 2.42157 22 3.25 22H22.75C23.5784 22 24.25 21.3284 24.25 20.5V8C24.25 7.17157 23.5784 6.5 22.75 6.5Z" stroke={isActive('/wallet') ? '#FF0000' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17.5 4V6.5" stroke={isActive('/wallet') ? '#FF0000' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.5 4V6.5" stroke={isActive('/wallet') ? '#FF0000' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.75 13H21.25C21.6642 13 22 13.3358 22 13.75V14.75C22 15.1642 21.6642 15.5 21.25 15.5H19.75C19.3358 15.5 19 15.1642 19 14.75V13.75C19 13.3358 19.3358 13 19.75 13Z" stroke={isActive('/wallet') ? '#FF0000' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
