"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GridLayout() {
  const router = useRouter();
  const [selectedLayout, setSelectedLayout] = useState<string>("");

  const handleLayoutSelect = (layoutId: string) => {
    console.log(`Selected layout: ${layoutId}`);
    // Save the selection and redirect to homepage
    router.push("/transition");
  };

  const handleContinue = () => {
    console.log({ selectedLayout });
    router.push("/profile");
  };

  return (
    <div className="bg-black relative w-[375px] h-[812px] mx-auto">
      {/* Red dot logo - positioned 10px from corners */}
      <div className="absolute left-[10px] top-[10px] w-[15px] h-[15px]">
        <div className="w-[15px] h-[15px] bg-[#EF4444] rounded-full"></div>
      </div>

      {/* Choose your grid layout Title */}
      <div className="absolute left-[50px] top-[54px]">
        <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%]">
          Choose your grid layout
        </p>
      </div>

      {/* Layout Options */}
      <div className="absolute left-[38px] top-[120px] w-[298px] space-y-4">
        
        {/* 2x super wide 2.4:1 */}
        <div 
          className={`w-full h-[60px] border border-white bg-transparent cursor-pointer flex items-center px-4 hover:bg-white hover:text-black transition-colors duration-200 ${selectedLayout === '2x-super-wide' ? 'bg-white text-black' : ''}`}
          onClick={() => handleLayoutSelect('2x-super-wide')}
        >
          <span className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[-0.22px] leading-[140%]">
            2x super wide 2.4:1
          </span>
        </div>

        {/* 1x super wide 2.4:1 */}
        <div 
          className={`w-full h-[60px] border border-white bg-transparent cursor-pointer flex items-center px-4 hover:bg-white hover:text-black transition-colors duration-200 ${selectedLayout === '1x-super-wide' ? 'bg-white text-black' : ''}`}
          onClick={() => handleLayoutSelect('1x-super-wide')}
        >
          <span className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[-0.22px] leading-[140%]">
            1x super wide 2.4:1
          </span>
        </div>

        {/* 2x regular wide 16:9 */}
        <div 
          className={`w-full h-[60px] border border-white bg-transparent cursor-pointer flex items-center px-4 hover:bg-white hover:text-black transition-colors duration-200 ${selectedLayout === '2x-regular-wide' ? 'bg-white text-black' : ''}`}
          onClick={() => handleLayoutSelect('2x-regular-wide')}
        >
          <span className="font-['IBM_Plex_Mono'] font-medium text-[11px] tracking-[-0.22px] leading-[140%]">
            2x regular wide 16:9
          </span>
        </div>

      </div>

      {/* Continue Button */}
      <div className="absolute left-[122px] top-[736px] w-[130px] h-[45px]">
        <button
          onClick={handleContinue}
          className="w-full h-full border border-white bg-transparent hover:bg-white hover:text-black transition-colors duration-200 flex items-center justify-center"
        >
          <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%] hover:text-black">
            Continue
          </span>
        </button>
      </div>
    </div>
  );
}
