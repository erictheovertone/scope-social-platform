"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { saveProfile, uploadImage, getUserByPrivyId, getProfileByUsername, syncUserWithSupabase } from "@/lib/userService";

export default function ProfileSetup() {
  const router = useRouter();
  const { user } = usePrivy();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        try {
          await syncUserWithSupabase(user);
        } catch (err) {
          console.error('Failed to sync user with Supabase:', err);
        }
      }
    };
    syncUser();
  }, [user]);

  const handleContinue = async () => {
    setIsLoading(true);
    setError(null);
    setUsernameError(null);

    try {
      if (!user) {
        setError('You must be logged in to set up your profile.');
        return;
      }

      const supabaseUser = await getUserByPrivyId(user.id);
      if (!supabaseUser) {
        setError('Could not find your account. Please try logging out and back in.');
        return;
      }

      let profileImageUrl: string | undefined = undefined;
      if (profileImageFile) {
        profileImageUrl = await uploadImage(profileImageFile, 'profile-images', user.id);
      }

      if (username) {
        const existing = await getProfileByUsername(username);
        if (existing && existing.user_id !== supabaseUser.id) {
          setUsernameError('That username is already taken');
          return;
        }
      }

      const profilePayload = { userId: supabaseUser.id, displayName, username, bio, profileImageUrl };
      console.log('Saving profile to Supabase:', profilePayload);

      await saveProfile(supabaseUser.id, {
        displayName,
        username,
        bio,
        profileImageUrl,
      });

      router.push("/profile/grid-layout");
    } catch (err) {
      const e = err && typeof err === 'object' ? err as Record<string, unknown> : {};
      console.error('Error saving profile:', [e.message, e.code, e.details, e.hint].filter(Boolean).join(' | ') || String(err));
      setError('Failed to save your profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="bg-black relative w-[375px] h-[900px] mx-auto">
      {/* Red dot logo */}
      <div className="absolute left-[10px] top-[10px] w-[15px] h-[15px]">
        <div className="w-[15px] h-[15px] bg-[#FF0000] rounded-full" />
      </div>

      {/* Title */}
      <div className="absolute left-[50px] top-[75px]">
        <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%]">Profile</p>
        <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%]">Setup</p>
      </div>

      {/* Profile Picture Upload */}
      <div className="absolute left-[130px] top-[143px] w-[114px] h-[114px] border border-white bg-transparent cursor-pointer" onClick={triggerFileInput}>
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-[60px] font-thin select-none" style={{ lineHeight: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</span>
          </div>
        )}
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

      {/* Name Input */}
      <div className="absolute left-[50px] top-[300px] w-[275px] h-[45px] border border-white bg-transparent">
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full h-full bg-transparent text-white outline-none px-[5px] font-['IBM_Plex_Mono'] font-medium text-[9px] tracking-[-0.18px] leading-[140%]"
          style={{ color: 'white' }}
        />
        {!displayName && (
          <div className="absolute left-[5px] top-[14.5px] transform -translate-y-1/2 pointer-events-none">
            <span className="font-['IBM_Plex_Mono'] font-medium text-[#818181] text-[9px] tracking-[-0.18px] leading-[140%]">Name</span>
          </div>
        )}
      </div>

      {/* Username Input */}
      <div className="absolute left-[50px] top-[365px] w-[275px] h-[45px] border border-white bg-transparent">
        <div className="relative w-full h-full flex items-center">
          <span className="absolute left-[5px] font-['IBM_Plex_Mono'] font-medium text-white text-[9px] tracking-[-0.18px] leading-[140%] pointer-events-none z-10">@</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-full bg-transparent text-white outline-none pl-[15px] pr-[5px] font-['IBM_Plex_Mono'] font-medium text-[9px] tracking-[-0.18px] leading-[140%]"
            style={{ color: 'white' }}
          />
        </div>
        {!username && (
          <div className="absolute left-[15px] top-[14.5px] transform -translate-y-1/2 pointer-events-none">
            <span className="font-['IBM_Plex_Mono'] font-medium text-[#818181] text-[9px] tracking-[-0.18px] leading-[140%]">Username</span>
          </div>
        )}
      </div>

      {usernameError && (
        <div className="absolute left-[50px] top-[412px]">
          <span className="font-['IBM_Plex_Mono'] font-medium text-[#FF0000] text-[9px] tracking-[-0.18px] leading-[140%]">
            {usernameError}
          </span>
        </div>
      )}

      {/* Bio Input */}
      <div className="absolute left-[50px] top-[430px] w-[275px] h-[130px] border border-white bg-transparent">
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={160}
          className="w-full h-full bg-transparent text-white outline-none px-[5px] py-[14.5px] font-['IBM_Plex_Mono'] font-medium text-[9px] tracking-[-0.18px] leading-[140%] resize-none"
          style={{ color: 'white' }}
        />
        {!bio && (
          <div className="absolute left-[5px] top-[14.5px] transform -translate-y-1/2 pointer-events-none">
            <span className="font-['IBM_Plex_Mono'] font-medium text-[#818181] text-[9px] tracking-[-0.18px] leading-[140%]">Bio [ 160 character max ]</span>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="absolute left-[50px] top-[590px] w-[275px]">
          <p className="font-['IBM_Plex_Mono'] font-medium text-[#FF0000] text-[9px] tracking-[-0.18px] leading-[140%]">
            {error}
          </p>
        </div>
      )}

      {/* Continue Button */}
      <div className="absolute left-[122px] top-[760px] w-[130px] h-[45px] z-50">
        <button
          onClick={handleContinue}
          disabled={isLoading}
          className="w-full h-full border border-white bg-black text-white flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[-0.22px] leading-[140%]">
            {isLoading ? 'Saving...' : 'Continue'}
          </span>
        </button>
      </div>
    </div>
  );
}
