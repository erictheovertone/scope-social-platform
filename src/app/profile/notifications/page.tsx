"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Notifications() {
  const router = useRouter();
  const [notifications] = useState([
    {
      id: 1,
      type: 'like',
      user: '@filmmaker2',
      action: 'liked your post',
      content: 'Cinematic shot from my latest project',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'comment',
      user: '@visualartist',
      action: 'commented on your post',
      content: 'Amazing composition! What lens did you use?',
      time: '4 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'trading',
      user: '@collector1',
      action: 'made an offer on your content',
      content: 'Ultra-wide landscape composition',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'follow',
      user: '@newuser',
      action: 'started following you',
      content: '',
      time: '2 days ago',
      read: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        );
      case 'comment':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        );
      case 'trading':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00FF00" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        );
      case 'follow':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-black relative w-[375px] h-[812px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#333333]">
        <button 
          onClick={() => router.back()} 
          className="text-white text-lg"
        >
          ←
        </button>
        <h1 className="font-['IBM_Plex_Mono'] font-medium text-white text-[18px]">
          Notifications
        </h1>
        <div className="w-6" />
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-6">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="1">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <p className="font-['IBM_Plex_Mono'] font-medium text-[#666666] text-[16px] mt-4 text-center">
              No notifications yet
            </p>
            <p className="font-['IBM_Plex_Mono'] font-normal text-[#666666] text-[12px] mt-2 text-center">
              You'll see likes, comments, and trading activity here
            </p>
          </div>
        ) : (
          <div className="px-4 py-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start p-4 mb-2 rounded-lg transition-colors hover:bg-[#1A1A1A] ${
                  !notification.read ? 'bg-[#1A1A1A] border-l-2 border-[#FF0000]' : ''
                }`}
              >
                <div className="mr-4 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px]">
                      <span className="text-[#888888]">{notification.user}</span> {notification.action}
                    </p>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-[#FF0000] rounded-full ml-2 mt-2"></div>
                    )}
                  </div>
                  
                  {notification.content && (
                    <p className="font-['IBM_Plex_Mono'] font-normal text-[#666666] text-[12px] mb-2">
                      "{notification.content}"
                    </p>
                  )}
                  
                  <p className="font-['IBM_Plex_Mono'] font-normal text-[#666666] text-[11px]">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="border-t border-[#333333] p-6">
        <button className="w-full text-left">
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] mb-1">
            Notification Settings
          </p>
          <p className="font-['IBM_Plex_Mono'] font-normal text-[#666666] text-[12px]">
            Manage what notifications you receive
          </p>
        </button>
      </div>
    </div>
  );
}
