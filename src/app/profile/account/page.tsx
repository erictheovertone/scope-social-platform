"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { supabase } from "@/lib/supabase/client";

export default function AccountSettings() {
  const router = useRouter();
  const { user } = usePrivy();
  const [settings, setSettings] = useState({
    email: user?.email?.address || "",
    displayName: "Eric",
    username: "overtone",
    bio: "I tell stories with visuals and sound.\nFilmmaker. Father. Anamorphic lover"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      // Update user profile in Supabase using privy_id directly
      const { error } = await supabase
        .from('profiles')
        .upsert({
          privy_id: user.id,
          display_name: settings.displayName,
          username: settings.username,
          bio: settings.bio,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'privy_id'
        });

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-black relative w-[430px] h-[932px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#333333]">
        <button 
          onClick={() => router.back()} 
          className="text-white text-lg"
        >
          ←
        </button>
        <h1 className="font-['IBM_Plex_Mono'] font-medium text-white text-[18px]">
          Account Settings
        </h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="font-['IBM_Plex_Mono'] font-medium text-[#FF0000] text-[14px]"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Profile Picture */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-[#333333] rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          {isEditing && (
            <button className="font-['IBM_Plex_Mono'] font-medium text-[#FF0000] text-[12px]">
              Change Photo
            </button>
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] block mb-2">
              Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={!isEditing}
              className={`w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-3 font-['IBM_Plex_Mono'] text-white text-[14px] ${
                isEditing ? 'focus:border-[#FF0000] focus:outline-none' : 'opacity-60'
              }`}
            />
          </div>

          {/* Display Name */}
          <div>
            <label className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] block mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={settings.displayName}
              onChange={(e) => handleChange('displayName', e.target.value)}
              disabled={!isEditing}
              className={`w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-3 font-['IBM_Plex_Mono'] text-white text-[14px] ${
                isEditing ? 'focus:border-[#FF0000] focus:outline-none' : 'opacity-60'
              }`}
            />
          </div>

          {/* Username */}
          <div>
            <label className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] block mb-2">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 font-['IBM_Plex_Mono'] text-[#666666] text-[14px]">
                @
              </span>
              <input
                type="text"
                value={settings.username}
                onChange={(e) => handleChange('username', e.target.value)}
                disabled={!isEditing}
                className={`w-full bg-[#1A1A1A] border border-[#333333] rounded-lg pl-8 pr-4 py-3 font-['IBM_Plex_Mono'] text-white text-[14px] ${
                  isEditing ? 'focus:border-[#FF0000] focus:outline-none' : 'opacity-60'
                }`}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] block mb-2">
              Bio
            </label>
            <textarea
              value={settings.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              disabled={!isEditing}
              rows={4}
              className={`w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-3 font-['IBM_Plex_Mono'] text-white text-[14px] resize-none ${
                isEditing ? 'focus:border-[#FF0000] focus:outline-none' : 'opacity-60'
              }`}
            />
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="mt-8">
            <button
              onClick={handleSave}
              className={`w-full py-4 rounded-lg font-['IBM_Plex_Mono'] font-medium text-[16px] transition-colors ${
                showSuccess 
                  ? 'bg-green-600 text-white' 
                  : 'bg-[#FF0000] text-white hover:bg-[#CC0000]'
              }`}
            >
              {isSaving ? 'Saving...' : showSuccess ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        )}

        {/* Account Actions */}
        <div className="mt-12 space-y-4">
          <button className="w-full text-left p-4 bg-[#1A1A1A] border border-[#333333] rounded-lg hover:bg-[#222222] transition-colors">
            <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] mb-1">
              Privacy Settings
            </p>
            <p className="font-['IBM_Plex_Mono'] font-normal text-[#666666] text-[12px]">
              Manage who can see your content
            </p>
          </button>

          <button className="w-full text-left p-4 bg-[#1A1A1A] border border-[#333333] rounded-lg hover:bg-[#222222] transition-colors">
            <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] mb-1">
              Linked Accounts
            </p>
            <p className="font-['IBM_Plex_Mono'] font-normal text-[#666666] text-[12px]">
              Connect social media accounts
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
