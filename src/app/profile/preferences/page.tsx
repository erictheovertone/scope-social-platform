"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { getUserGridLayout } from "@/lib/gridLayoutService";

export default function Preferences() {
  const router = useRouter();
  const { user, logout } = usePrivy();
  const [userSettings, setUserSettings] = useState({
    email: "",
    displayName: "Eric",
    username: "overtone",
    bio: "I tell stories with visuals and sound.\nFilmmaker. Father. Anamorphic lover",
    gridLayout: "3x-square"
  });

  useEffect(() => {
    if (user?.id) {
      const currentLayout = getUserGridLayout(user.id);
      if (currentLayout) {
        setUserSettings(prev => ({
          ...prev,
          gridLayout: currentLayout.layoutName
        }));
      }
    }
  }, [user?.id]);

  const handleLogout = async () => {
    await logout();
    router.push('/welcome');
  };

  const settingsItems = [
    {
      label: '+Invite',
      description: 'Share Scope with friends',
      href: '/profile/invite',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    {
      label: 'Notifications',
      description: 'Likes, comments, and trading activity',
      href: '/profile/notifications',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      )
    },
    {
      label: 'Hidden Posts',
      description: 'Manage your hidden content',
      href: '/profile/hidden',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
          <path d="M3 3l18 18"/>
        </svg>
      )
    },
    {
      label: 'Account Settings',
      description: 'Email, name, and bio',
      href: '/profile/account',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
    {
      label: 'Grid Layout',
      description: `Current: ${userSettings.gridLayout}`,
      href: '/profile/grid-layout',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      )
    },
    {
      label: 'Contact Us',
      description: 'Get help and support',
      href: '/profile/contact',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    },
    {
      label: 'Terms of Service',
      description: 'Legal agreement and policies',
      href: '/profile/terms',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      )
    },
    {
      label: 'Delete Account',
      description: 'Permanently delete your account',
      href: '/profile/delete-account',
      danger: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="1.5">
          <polyline points="3,6 5,6 21,6"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          <line x1="10" y1="11" x2="10" y2="17"/>
          <line x1="14" y1="11" x2="14" y2="17"/>
        </svg>
      )
    }
  ];

  return (
    <div className="bg-black relative w-[375px] h-[812px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#333333]">
        <button 
          onClick={() => router.back()} 
          className="text-white text-lg"
        >
          ←
        </button>
        <h1 className="font-['IBM_Plex_Mono'] font-medium text-white text-[16px]">
          Settings
        </h1>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto px-2">
        {settingsItems.map((item, index) => (
          <div key={item.label}>
            <Link
              href={item.href}
              className="flex items-center px-6 py-6 hover:bg-[#1A1A1A] transition-colors rounded-lg mx-2 my-1"
            >
              <div className="mr-6 flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[16px] mb-2">
                  {item.label}
                </p>
                <p className="font-['IBM_Plex_Mono'] font-normal text-[#888888] text-[13px] leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="ml-4 text-[#666666]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
              </div>
            </Link>
          </div>
        ))}

        {/* Log Out Button - Separate at bottom */}
        <div className="mt-12 px-6 pb-8">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center py-5 bg-transparent border border-[#FF0000] rounded-lg hover:bg-[#FF0000] hover:bg-opacity-10 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="1.5" className="mr-3">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span className="font-['IBM_Plex_Mono'] font-medium text-[#FF0000] text-[16px]">
              Log Out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
