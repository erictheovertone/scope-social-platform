"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { setUserGridLayout, getUserGridLayout } from "@/lib/gridLayoutService";

export default function GridLayout() {
  const router = useRouter();
  const { user } = usePrivy();
  const [selectedLayout, setSelectedLayout] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);

  // Load user's current grid preference
  useEffect(() => {
    if (user?.id) {
      const currentLayout = getUserGridLayout(user.id);
      if (currentLayout) {
        setSelectedLayout(currentLayout.layoutId);
      }
    }
  }, [user?.id]);

  const handleLayoutSelect = (layoutId: string) => {
    setSelectedLayout(layoutId);
    setShowPreview(true);
  };

  const handleContinue = async () => {
    if (selectedLayout && user?.id) {
      const layoutNames = {
        '2x-super-wide': '2x Super Wide',
        '1x-super-wide': '1x Super Wide',
        '2x-regular-wide': '2x Regular Wide',
        '3x-square': '3x Square',
        'collage': 'Collage'
      };

      const aspectRatios = {
        '2x-super-wide': '21:9',
        '1x-super-wide': '21:9',
        '2x-regular-wide': '16:9',
        '3x-square': '1:1',
        'collage': 'mixed'
      };

      await setUserGridLayout(
        user.id,
        selectedLayout,
        layoutNames[selectedLayout as keyof typeof layoutNames],
        aspectRatios[selectedLayout as keyof typeof aspectRatios]
      );

      router.push("/profile");
    }
  };

  const handleCancel = () => {
    setShowPreview(false);
    setTimeout(() => setSelectedLayout(""), 300);
  };

  const renderPreviewLayout = () => {
    if (!showPreview) return null;

    const layoutConfigs = {
      '2x-super-wide': [
        // Row 1
        { width: 184, height: 75, top: 70, left: 2 },
        { width: 184, height: 75, top: 70, left: 189 },
        // Row 2
        { width: 184, height: 75, top: 149, left: 2 },
        { width: 184, height: 75, top: 149, left: 189 },
        // Row 3
        { width: 184, height: 75, top: 228, left: 2 },
        { width: 184, height: 75, top: 228, left: 189 },
        // Row 4
        { width: 184, height: 75, top: 307, left: 2 },
        { width: 184, height: 75, top: 307, left: 189 },
        // Row 5
        { width: 184, height: 75, top: 386, left: 2 },
        { width: 184, height: 75, top: 386, left: 189 },
        // Row 6
        { width: 184, height: 75, top: 465, left: 2 },
        { width: 184, height: 75, top: 465, left: 189 },
        // Row 7
        { width: 184, height: 75, top: 544, left: 2 },
        { width: 184, height: 75, top: 544, left: 189 },
        // Row 8
        { width: 184, height: 75, top: 623, left: 2 },
        { width: 184, height: 75, top: 623, left: 189 },
        // Row 9
        { width: 184, height: 75, top: 702, left: 2 },
        { width: 184, height: 75, top: 702, left: 189 }
      ],
      '1x-super-wide': [
        { width: 371, height: 120, top: 70, left: 2 },
        { width: 371, height: 120, top: 192, left: 2 },
        { width: 371, height: 120, top: 314, left: 2 },
        { width: 371, height: 120, top: 436, left: 2 },
        { width: 371, height: 120, top: 558, left: 2 },
        { width: 371, height: 120, top: 680, left: 2 }
      ],
      '2x-regular-wide': [
        // Row 1
        { width: 184, height: 100, top: 70, left: 2 },
        { width: 184, height: 100, top: 70, left: 189 },
        // Row 2
        { width: 184, height: 100, top: 172, left: 2 },
        { width: 184, height: 100, top: 172, left: 189 },
        // Row 3
        { width: 184, height: 100, top: 274, left: 2 },
        { width: 184, height: 100, top: 274, left: 189 },
        // Row 4
        { width: 184, height: 100, top: 376, left: 2 },
        { width: 184, height: 100, top: 376, left: 189 },
        // Row 5
        { width: 184, height: 100, top: 478, left: 2 },
        { width: 184, height: 100, top: 478, left: 189 },
        // Row 6
        { width: 184, height: 100, top: 580, left: 2 },
        { width: 184, height: 100, top: 580, left: 189 },
        // Row 7
        { width: 184, height: 100, top: 682, left: 2 },
        { width: 184, height: 100, top: 682, left: 189 }
      ],
      '3x-square': [
        // Row 1
        { width: 122, height: 122, top: 70, left: 2 },
        { width: 122, height: 122, top: 70, left: 126 },
        { width: 122, height: 122, top: 70, left: 250 },
        // Row 2
        { width: 122, height: 122, top: 194, left: 2 },
        { width: 122, height: 122, top: 194, left: 126 },
        { width: 122, height: 122, top: 194, left: 250 },
        // Row 3
        { width: 122, height: 122, top: 318, left: 2 },
        { width: 122, height: 122, top: 318, left: 126 },
        { width: 122, height: 122, top: 318, left: 250 },
        // Row 4
        { width: 122, height: 122, top: 442, left: 2 },
        { width: 122, height: 122, top: 442, left: 126 },
        { width: 122, height: 122, top: 442, left: 250 },
        // Row 5
        { width: 122, height: 122, top: 566, left: 2 },
        { width: 122, height: 122, top: 566, left: 126 },
        { width: 122, height: 122, top: 566, left: 250 },
        // Row 6
        { width: 122, height: 122, top: 690, left: 2 },
        { width: 122, height: 122, top: 690, left: 126 },
        { width: 122, height: 122, top: 690, left: 250 }
      ],
      'collage': [
        // Row 1
        { width: 120, height: 80, top: 70, left: 2 },
        { width: 80, height: 80, top: 70, left: 124 },
        { width: 165, height: 80, top: 70, left: 206 },
        // Row 2
        { width: 90, height: 70, top: 152, left: 2 },
        { width: 140, height: 70, top: 152, left: 94 },
        { width: 135, height: 70, top: 152, left: 236 },
        // Row 3
        { width: 110, height: 85, top: 224, left: 2 },
        { width: 100, height: 85, top: 224, left: 114 },
        { width: 155, height: 85, top: 224, left: 216 },
        // Row 4
        { width: 85, height: 75, top: 311, left: 2 },
        { width: 125, height: 75, top: 311, left: 89 },
        { width: 155, height: 75, top: 311, left: 216 },
        // Row 5
        { width: 95, height: 90, top: 388, left: 2 },
        { width: 115, height: 90, top: 388, left: 99 },
        { width: 155, height: 90, top: 388, left: 216 },
        // Row 6
        { width: 105, height: 65, top: 480, left: 2 },
        { width: 95, height: 65, top: 480, left: 109 },
        { width: 165, height: 65, top: 480, left: 206 },
        // Row 7
        { width: 88, height: 80, top: 547, left: 2 },
        { width: 130, height: 80, top: 547, left: 92 },
        { width: 147, height: 80, top: 547, left: 224 },
        // Row 8
        { width: 100, height: 70, top: 629, left: 2 },
        { width: 120, height: 70, top: 629, left: 104 },
        { width: 145, height: 70, top: 629, left: 226 },
        // Row 9
        { width: 92, height: 85, top: 701, left: 2 },
        { width: 125, height: 85, top: 701, left: 96 },
        { width: 148, height: 85, top: 701, left: 223 }
      ]
    };

    const boxes = layoutConfigs[selectedLayout as keyof typeof layoutConfigs] || [];

    const getLayoutTitle = () => {
      const titles = {
        '2x-super-wide': '2x super wide',
        '1x-super-wide': '1x super wide', 
        '2x-regular-wide': '2x regular wide',
        '3x-square': '3x square',
        'collage': 'collage'
      };
      return titles[selectedLayout as keyof typeof titles] || selectedLayout;
    };

    return (
      <div className={`absolute inset-0 transition-opacity duration-500 ${showPreview ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute left-[187.5px] top-[35px] transform -translate-x-1/2 z-30">
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] tracking-[-0.28px] leading-[140%] whitespace-nowrap">
            {getLayoutTitle()}
          </p>
        </div>
        
        {boxes.map((box, index) => (
          <div
            key={index}
            className={`absolute bg-transparent transition-all duration-600 ease-out ${
              showPreview ? 'border-2 border-[#FF0000]' : 'border border-white'
            }`}
            style={{
              width: `${box.width}px`,
              height: `${box.height}px`,
              top: `${box.top}px`,
              left: `${box.left}px`,
              transitionDelay: `${index * 80}ms`,
              transform: showPreview ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(10px)',
              opacity: showPreview ? 1 : 0.8
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-black relative w-[375px] h-[812px] mx-auto overflow-hidden">
      {/* Red dot logo */}
      <Link href="/">
        <div className="absolute left-[1px] top-[2px] w-[15px] h-[15px] cursor-pointer z-20">
          <div className="w-[15px] h-[15px] bg-[#FF0000] rounded-full"></div>
        </div>
      </Link>

      {/* Original Layout Selection - hide when preview is shown */}
      <div className={`transition-opacity duration-300 ${showPreview ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Welcome Eric. / Choose your grid layout */}
        <div className="absolute left-[3px] top-[30px]">
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px] tracking-[-0.22px] leading-[140%]">
            Welcome Eric. &nbsp;&nbsp;&nbsp; Choose your grid layout
          </p>
        </div>

        {/* 2x super wide */}
        <div className="absolute left-[2px] top-[77px]">
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[9px] tracking-[-0.18px] leading-[140%]">2x super wide</p>
        </div>
        <div
          className="absolute left-[2px] top-[99px] flex gap-[1px] cursor-pointer"
          onMouseDown={() => handleLayoutSelect('2x-super-wide')}
        >
          <div className={`w-[185px] h-[62px] border ${selectedLayout === '2x-super-wide' ? 'border-[#FF0000]' : 'border-white'} bg-transparent transition-colors duration-200`} />
          <div className={`w-[185px] h-[62px] border ${selectedLayout === '2x-super-wide' ? 'border-[#FF0000]' : 'border-white'} bg-transparent transition-colors duration-200`} />
        </div>

        {/* 1x super wide */}
        <div className="absolute left-[2px] top-[177px]">
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[9px] tracking-[-0.18px] leading-[140%]">1x super wide</p>
        </div>
        <div
          className={`absolute left-[2px] top-[199px] w-[371px] h-[122px] border ${selectedLayout === '1x-super-wide' ? 'border-[#FF0000]' : 'border-white'} bg-transparent cursor-pointer transition-colors duration-200`}
          onMouseDown={() => handleLayoutSelect('1x-super-wide')}
        />

        {/* 2x regular wide */}
        <div className="absolute left-[2px] top-[339px]">
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[9px] tracking-[-0.18px] leading-[140%]">2x regular wide</p>
        </div>
        <div
          className="absolute left-[2px] top-[357px] flex gap-[1px] cursor-pointer"
          onMouseDown={() => handleLayoutSelect('2x-regular-wide')}
        >
          <div className={`w-[185px] h-[103px] border ${selectedLayout === '2x-regular-wide' ? 'border-[#FF0000]' : 'border-white'} bg-transparent transition-colors duration-200`} />
          <div className={`w-[185px] h-[103px] border ${selectedLayout === '2x-regular-wide' ? 'border-[#FF0000]' : 'border-white'} bg-transparent transition-colors duration-200`} />
        </div>

        {/* 3x square */}
        <div className="absolute left-[2px] top-[473px]">
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[9px] tracking-[-0.18px] leading-[140%]">3x square</p>
        </div>
        <div
          className="absolute left-[2px] top-[491px] flex gap-[1px] cursor-pointer"
          onMouseDown={() => handleLayoutSelect('3x-square')}
        >
          <div className={`w-[123px] h-[121px] border ${selectedLayout === '3x-square' ? 'border-[#FF0000]' : 'border-white'} bg-transparent transition-colors duration-200`} />
          <div className={`w-[123px] h-[121px] border ${selectedLayout === '3x-square' ? 'border-[#FF0000]' : 'border-white'} bg-transparent transition-colors duration-200`} />
          <div className={`w-[121px] h-[121px] border ${selectedLayout === '3x-square' ? 'border-[#FF0000]' : 'border-white'} bg-transparent transition-colors duration-200`} />
        </div>

        {/* collage */}
        <div className="absolute left-[2px] top-[626px]">
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[9px] tracking-[-0.18px] leading-[140%]">collage</p>
        </div>
        <div
          className="absolute left-[2px] top-[644px] flex gap-[2px] cursor-pointer"
          onMouseDown={() => handleLayoutSelect('collage')}
        >
          <div className={`w-[82px] h-[82px] border ${selectedLayout === 'collage' ? 'border-[#FF0000]' : 'border-white'} bg-transparent transition-colors duration-200`} />
          <div className={`w-[83px] h-[82px] border ${selectedLayout === 'collage' ? 'border-[#FF0000]' : 'border-white'} bg-transparent transition-colors duration-200`} />
          <div className={`w-[202px] h-[82px] border ${selectedLayout === 'collage' ? 'border-[#FF0000]' : 'border-white'} bg-transparent transition-colors duration-200`} />
        </div>
      </div>

      {/* Preview Layout */}
      {renderPreviewLayout()}

      {/* Continue? Y / N buttons - only show when preview is shown */}
      {showPreview && (
        <div className="absolute left-1/2 bottom-[100px] transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center space-y-4">
            <p className="font-['IBM_Plex_Mono'] font-semibold text-white text-[14px] tracking-[-0.28px] leading-[140%]">
              Continue?
            </p>
            <div className="flex space-x-6">
              <button
                onClick={handleContinue}
                className="w-[60px] h-[40px] border-2 border-white bg-black text-white hover:bg-white hover:text-black transition-colors duration-200"
              >
                <span className="font-['IBM_Plex_Mono'] font-bold text-[16px] tracking-[-0.32px] leading-[140%]">
                  Y
                </span>
              </button>
              <button
                onClick={handleCancel}
                className="w-[60px] h-[40px] border-2 border-white bg-black text-white hover:bg-white hover:text-black transition-colors duration-200"
              >
                <span className="font-['IBM_Plex_Mono'] font-bold text-[16px] tracking-[-0.32px] leading-[140%]">
                  N
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
