"use client";

// import Link from "next/link";
import { useState, useEffect } from "react";
import { useLogin } from '@privy-io/react-auth';

// const imgScopeLogo1 = "/scope-logo.svg";

export default function Welcome() {
  const [isLoading, setIsLoading] = useState(true);
  
  const { login } = useLogin({
    onComplete: () => {
      console.log('Authentication successful, redirecting...');
      window.location.href = '/profile/setup';
    },
    onError: (error) => {
      console.log('Authentication error:', error);
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{ 
        backgroundColor: '#000000', 
        minHeight: '100vh', 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#ef4444',
          borderRadius: '50%',
          animation: 'swift-bounce 0.4s infinite'
        }}></div>
      </div>
    );
  }

  return (
    <div 
      className="bg-black relative w-[375px] h-[812px] mx-auto opacity-0 animate-fade-in" 
      data-name="Welcome Page" 
      data-node-id="86:27"
      style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
    >
      <div className="absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2" style={{ marginLeft: '24px', marginTop: '30px' }}>
        <img 
          src="/logo.svg"
          alt="Scope Logo"
          className="w-[350px] h-auto"
        />
      </div>
      
      <div className="absolute w-[337px] h-[112px] border border-white" style={{ left: '19px', bottom: '80px' }}>
        <button 
          onClick={login}
          style={{
            position: 'absolute',
            top: '2px',
            left: '2px',
            color: 'white',
            fontSize: '14px',
            fontFamily: 'Menlo, monospace',
            textDecoration: 'none',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1000,
            transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className="hover:opacity-70 scope-auth-button"
          onPointerDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
            e.currentTarget.style.opacity = '0.8';
          }}
          onPointerUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '1';
          }}
          onPointerLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '1';
          }}
        >
          LOG IN
        </button>
        <button 
          onClick={login}
          style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            color: 'white',
            fontSize: '14px',
            fontFamily: 'Menlo, monospace',
            textDecoration: 'none',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1000,
            transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className="hover:opacity-70 scope-auth-button"
          onPointerDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
            e.currentTarget.style.opacity = '0.8';
          }}
          onPointerUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '1';
          }}
          onPointerLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.opacity = '1';
          }}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}
