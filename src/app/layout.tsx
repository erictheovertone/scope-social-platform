'use client';

import "./globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { privyConfig, PRIVY_APP_ID } from '@/lib/privy';
import { Suspense } from 'react';

// Loading component for better UX
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Scope - Cinematic Social Platform</title>
        <meta name="description" content="A cinematic social platform where creators post ultra-wide images/videos into customizable grids." />
        
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* IBM Plex Mono fallback font */}
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://auth.privy.io" />
        
      </head>
      <body
        className="bg-black text-white font-mono antialiased"
        suppressHydrationWarning
      >
        <PrivyProvider
          appId={PRIVY_APP_ID}
          config={privyConfig}
        >
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </PrivyProvider>
      </body>
    </html>
  );
}
