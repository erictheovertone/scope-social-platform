"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Transition() {
  const router = useRouter();
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Animation sequence
    const timer1 = setTimeout(() => setAnimationStep(1), 500);
    const timer2 = setTimeout(() => setAnimationStep(2), 1500);
    const timer3 = setTimeout(() => setAnimationStep(3), 2500);
    
    // Redirect to home after animation
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="bg-black relative w-[375px] h-[812px] mx-auto flex items-center justify-center">
      
      {/* Animated Elements */}
      <div className="relative">
        
        {/* Red dot that grows */}
        <div 
          className={`bg-[#EF4444] rounded-full transition-all duration-1000 ${
            animationStep >= 1 ? 'w-[60px] h-[60px]' : 'w-[15px] h-[15px]'
          } ${
            animationStep >= 2 ? 'opacity-50' : 'opacity-100'
          }`}
        ></div>

        {/* Grid lines that appear */}
        {animationStep >= 2 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[200px] h-[200px] opacity-30 animate-fade-in">
              <div className="grid grid-cols-3 grid-rows-3 w-full h-full gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="border border-white"></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Welcome text */}
        {animationStep >= 3 && (
          <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 text-center animate-fade-in">
            <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] tracking-[-0.28px] leading-[140%] mb-2">
              Welcome to
            </p>
            <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] tracking-[-0.28px] leading-[140%]">
              Scope
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
