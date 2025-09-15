'use client';

import "./globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
// import { UserSyncProvider } from "@/components/UserSyncProvider";
import { privyConfig, PRIVY_APP_ID } from '@/lib/privy';

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body
        className="bg-black text-white font-mono antialiased"
        suppressHydrationWarning
      >
        <PrivyProvider
          appId={PRIVY_APP_ID}
          config={privyConfig}
        >
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
