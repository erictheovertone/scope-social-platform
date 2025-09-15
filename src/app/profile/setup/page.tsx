"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSetup() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleContinue = () => {
    console.log({ username, displayName, bio, profileImage });
    router.push("/profile/grid-layout");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-black relative w-[375px] h-[900px] mx-auto">
      {/* Red dot logo - positioned 10px from corners */}
      <div className="absolute left-[10px] top-[10px] w-[15px] h-[15px]">
        <div className="w-[15px] h-[15px] bg-[#FF0000] rounded-full"></div>
      </div>

      {/* Profile Setup Title - stacked on separate lines, moved down */}
      <div className="absolute left-[50px] top-[75px]">
        <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%]">
          Profile
        </p>
        <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%]">
          Setup
        </p>
      </div>

      {/* Profile Picture Upload - 114x114px with large centered + */}
      <div className="absolute left-[130px] top-[143px] w-[114px] h-[114px] border border-white bg-transparent cursor-pointer" onClick={triggerFileInput}>
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-[60px] font-thin select-none" style={{ lineHeight: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</span>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Name Input Field */}
      <div className="absolute left-[50px] top-[300px] w-[275px] h-[45px] border border-white bg-transparent">
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full h-full bg-transparent text-white outline-none px-[5px] font-['IBM_Plex_Mono'] font-medium text-[9px] tracking-[-0.18px] leading-[140%]"
          style={{ color: 'white' }}
          placeholder=""
        />
        {!displayName && (
          <div className="absolute left-[5px] top-[14.5px] transform -translate-y-1/2 pointer-events-none">
            <span className="font-['IBM_Plex_Mono'] font-medium text-[#818181] text-[9px] tracking-[-0.18px] leading-[140%]">
              Name
            </span>
          </div>
        )}
      </div>

      {/* Username Input Field with @ prefix */}
      <div className="absolute left-[50px] top-[365px] w-[275px] h-[45px] border border-white bg-transparent">
        <div className="relative w-full h-full flex items-center">
          <span className="absolute left-[5px] font-['IBM_Plex_Mono'] font-medium text-white text-[9px] tracking-[-0.18px] leading-[140%] pointer-events-none z-10">
            @
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-full bg-transparent text-white outline-none pl-[15px] pr-[5px] font-['IBM_Plex_Mono'] font-medium text-[9px] tracking-[-0.18px] leading-[140%]"
            style={{ color: 'white' }}
            placeholder=""
          />
        </div>
        {!username && (
          <div className="absolute left-[15px] top-[14.5px] transform -translate-y-1/2 pointer-events-none">
            <span className="font-['IBM_Plex_Mono'] font-medium text-[#818181] text-[9px] tracking-[-0.18px] leading-[140%]">
              Username
            </span>
          </div>
        )}
      </div>

      {/* Bio Input Field */}
      <div className="absolute left-[50px] top-[430px] w-[275px] h-[130px] border border-white bg-transparent">
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={160}
          className="w-full h-full bg-transparent text-white outline-none px-[5px] py-[14.5px] font-['IBM_Plex_Mono'] font-medium text-[9px] tracking-[-0.18px] leading-[140%] resize-none"
          style={{ color: 'white' }}
          placeholder=""
        />
        {!bio && (
          <div className="absolute left-[5px] top-[14.5px] transform -translate-y-1/2 pointer-events-none">
            <span className="font-['IBM_Plex_Mono'] font-medium text-[#818181] text-[9px] tracking-[-0.18px] leading-[140%]">
              Bio [ 160 character max ]
            </span>
          </div>
        )}
      </div>

      {/* Continue Button - white outline, white text, no fill */}
      <div 
        className="absolute left-[122px] top-[760px] w-[130px] h-[45px] z-50"
        style={{ 
          position: 'absolute',
          left: '122px',
          top: '760px',
          width: '130px',
          height: '45px',
          zIndex: 50
        }}
      >
        <button
          onClick={handleContinue}
          className="w-full h-full border border-white bg-transparent text-white hover:bg-white hover:text-black transition-colors duration-200 flex items-center justify-center cursor-pointer"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            border: '1px solid white',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%] hover:text-black">
            Continue
          </span>
        </button>
      </div>
    </div>
  );
}
