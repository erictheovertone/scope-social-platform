"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Transition() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after animation duration
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="bg-black relative w-[375px] h-[812px] mx-auto flex items-center justify-center">
      
      {/* Bouncing Red Ball - exact copy from welcome page */}
      <div style={{
        width: '32px',
        height: '32px',
        backgroundColor: '#FF0000',
        borderRadius: '50%',
        animation: 'swift-bounce 0.4s infinite'
      }}></div>

    </div>
  );
}
