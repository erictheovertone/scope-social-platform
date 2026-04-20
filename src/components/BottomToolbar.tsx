"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

const TOOLBAR_PATHS = ['/', '/profile', '/wallet', '/create'];

export default function BottomToolbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = useCallback((path: string) => {
    if (pathname !== path) {
      router.push(path);
    }
  }, [router, pathname]);

  const isActive = (path: string) => pathname === path;

  // Only hide when the path is known and confirmed not in the list.
  // While pathname is null (pre-hydration), render rather than flash-hide.
  if (pathname && !TOOLBAR_PATHS.includes(pathname)) return null;

  const isProfile = pathname === '/profile';

  return (
    <div
      className="bg-black"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        zIndex: 50,
        background: 'transparent',
      }}
    >
      {/* justify-between spreads icons evenly; align-items+pb pins them 2px from bottom */}
      <div style={{ width: '375px', height: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 2px 2px' }}>

        {/* Home */}
        <button onClick={() => handleNavigation('/')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isActive('/') ? 1 : 0.7 }} aria-label="Home">
          <svg width="13.5" height="13.5" viewBox="0 0 27 27" fill="none">
            <path d="M3.375 10.125L13.5 3.375L23.625 10.125V22.5C23.625 23.0967 23.3879 23.669 22.9597 24.0972C22.5315 24.5254 21.9592 24.7625 21.3625 24.7625H5.6375C5.04076 24.7625 4.46851 24.5254 4.04029 24.0972C3.61207 23.669 3.375 23.0967 3.375 22.5V10.125Z" stroke={isActive('/') ? '#FF0000' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.125 24.7625V13.5H16.875V24.7625" stroke={isActive('/') ? '#FF0000' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Create Post */}
        <button onClick={() => handleNavigation('/create')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isActive('/create') ? 1 : 0.7 }} aria-label="Create Post">
          <svg width="13.5" height="13.5" viewBox="0 0 27 27" fill="none">
            <path d="M13.5 5.0625V21.9375M5.0625 13.5H21.9375" stroke={isActive('/create') ? '#FF0000' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Profile — shown on all pages except /profile; on /profile this slot is empty so wallet moves to right */}
        {!isProfile && (
          <button onClick={() => handleNavigation('/profile')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7 }} aria-label="Profile">
            <svg width="13.5" height="13.5" viewBox="0 0 27 27" fill="none">
              <path d="M20.25 23.625V21.375C20.25 20.1815 19.7759 19.037 18.9331 18.1942C18.0903 17.3514 16.9458 16.875 15.75 16.875H11.25C10.0542 16.875 8.90973 17.3514 8.06694 18.1942C7.22414 19.037 6.75 20.1815 6.75 21.375V23.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.5 12.375C15.9853 12.375 18 10.3603 18 7.875C18 5.38972 15.9853 3.375 13.5 3.375C11.0147 3.375 9 5.38972 9 7.875C9 10.3603 11.0147 12.375 13.5 12.375Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Wallet */}
        <button onClick={() => handleNavigation('/wallet')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isActive('/wallet') ? 1 : 0.7 }} aria-label="Wallet">
          <svg width="13" height="13" viewBox="0 0 26 26" fill="none">
            <path d="M22.75 6.5H3.25C2.42157 6.5 1.75 7.17157 1.75 8V20.5C1.75 21.3284 2.42157 22 3.25 22H22.75C23.5784 22 24.25 21.3284 24.25 20.5V8C24.25 7.17157 23.5784 6.5 22.75 6.5Z" stroke={isActive('/wallet') ? '#FF0000' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.5 4V6.5" stroke={isActive('/wallet') ? '#FF0000' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.5 4V6.5" stroke={isActive('/wallet') ? '#FF0000' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.75 13H21.25C21.6642 13 22 13.3358 22 13.75V14.75C22 15.1642 21.6642 15.5 21.25 15.5H19.75C19.3358 15.5 19 15.1642 19 14.75V13.75C19 13.3358 19.3358 13 19.75 13Z" stroke={isActive('/wallet') ? '#FF0000' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </div>
  );
}
