'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { GridLayout } from '@/lib/types';

const gridLayoutOptions: { value: GridLayout; label: string; description: string }[] = [
  { value: '2-across-16:9', label: '2-Across 16:9', description: '2 columns, widescreen aspect ratio' },
  { value: '2-across-2.4:1', label: '2-Across 2.4:1', description: '2 columns, cinematic aspect ratio' },
  { value: '1-across-16:9', label: '1-Across 16:9', description: '1 column, widescreen aspect ratio' },
  { value: '1-across-2.4:1', label: '1-Across 2.4:1', description: '1 column, cinematic aspect ratio' },
  { value: '3-across-4:3', label: '3-Across 4:3', description: '3 columns, square aspect ratio' },
  { value: 'collage', label: 'Collage Mode', description: 'Random mix of aspect ratios' },
];

export default function AccountPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'login'; // 'login' or 'signup'
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [selectedLayout, setSelectedLayout] = useState<GridLayout>('2-across-2.4:1');
  const [profileImage, setProfileImage] = useState('');
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Auto-populate user data when authenticated
  useEffect(() => {
    if (authenticated && user) {
      // Use email or farcaster username as default username
      const defaultUsername = user.farcaster?.username || 
                             user.email?.address?.split('@')[0] || 
                             'user';
      setUsername(defaultUsername);
    }
  }, [authenticated, user]);

  const handleSave = () => {
    // For now, just redirect to profile page
    // Later this will save to database
    setIsSetupComplete(true);
    setTimeout(() => {
      window.location.href = `/profile/${username || 'demo'}`;
    }, 1000);
  };

  // Show loading state while Privy initializes
  if (!ready) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-4 animate-pulse"></div>
          <p className="font-mono">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authentication options if not logged in
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          {/* SCOPE Logo */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-4"></div>
              <h1 className="text-white text-4xl font-bold tracking-[0.1em]" style={{ fontFamily: 'Menlo, Monaco, monospace', fontWeight: 'normal' }}>
                SCOPE
              </h1>
            </div>
          </div>

          <h2 className="text-xl mb-8 font-normal">
            {mode === 'signup' ? 'Create your account' : 'Sign in to continue'}
          </h2>
          
          <div className="space-y-4 mb-8">
            <p className="text-sm text-gray-400 font-mono">
              • Sign in via Google, X (Twitter), Farcaster, or Email
            </p>
            <p className="text-sm text-gray-400 font-mono">
              • Auto-generates a Base wallet for you
            </p>
            <p className="text-sm text-gray-400 font-mono">
              • Fund with credit card or ETH/WETH/USDC
            </p>
          </div>

          <button
            onClick={login}
            className="w-full py-4 border border-white text-white font-normal tracking-wide hover:bg-white hover:text-black transition-colors duration-200"
            style={{ fontFamily: 'Menlo, Monaco, monospace' }}
          >
            CONNECT WALLET & SIGN IN
          </button>

          <Link href="/" className="block mt-6 text-sm text-gray-400 hover:text-white">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="text-white hover:text-gray-300">
            ← Back
          </Link>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
            <span className="text-xl font-bold tracking-wider">SCOPE</span>
          </div>
        </div>

        <h1 className="text-2xl font-normal mb-8 text-center">Account Setup</h1>

        {/* User & Wallet Info */}
        <div className="mb-8 p-4 border border-gray-600 bg-gray-900 bg-opacity-30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-normal tracking-wide">CONNECTED ACCOUNT</h3>
            <button
              onClick={logout}
              className="text-xs text-gray-400 hover:text-white border border-gray-600 px-3 py-1"
            >
              LOGOUT
            </button>
          </div>
          
          <div className="space-y-2 text-sm font-mono">
            {user?.email && (
              <p><span className="text-gray-400">Email:</span> {user.email.address}</p>
            )}
            {user?.farcaster && (
              <p><span className="text-gray-400">Farcaster:</span> @{user.farcaster.username}</p>
            )}
            {user?.twitter && (
              <p><span className="text-gray-400">X (Twitter):</span> @{user.twitter.username}</p>
            )}
            {wallets.length > 0 && (
              <div>
                <p className="text-gray-400 mb-1">Wallet:</p>
                {wallets.map((wallet, index) => (
                  <p key={index} className="text-xs text-green-400 break-all">
                    {wallet.address} ({wallet.walletClientType})
                  </p>
                ))}
              </div>
            )}
            {wallets.length === 0 && (
              <p className="text-yellow-400 text-xs">⚠ No wallet found - one will be created automatically</p>
            )}
          </div>
        </div>

        {/* Profile Setup Form */}
        <div className="space-y-8">
          {/* Username */}
          <div>
            <label className="block text-sm font-normal mb-2 tracking-wide">
              USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black border border-white px-4 py-3 text-white font-mono focus:outline-none focus:border-red-500"
              placeholder="Enter unique username"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-normal mb-2 tracking-wide">
              BIO (160 CHARS)
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 160))}
              className="w-full bg-black border border-white px-4 py-3 text-white font-mono focus:outline-none focus:border-red-500 h-24 resize-none"
              placeholder="Tell your story..."
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {bio.length}/160
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-normal mb-2 tracking-wide">
              PROFILE IMAGE
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-800 border border-white flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-gray-400">IMG</span>
                )}
              </div>
              <input
                type="url"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                className="flex-1 bg-black border border-white px-4 py-3 text-white font-mono focus:outline-none focus:border-red-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Grid Layout Selection */}
          <div>
            <label className="block text-sm font-normal mb-4 tracking-wide">
              GRID LAYOUT (6 OPTIONS)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {gridLayoutOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedLayout(option.value)}
                  className={`p-4 border text-left transition-colors ${
                    selectedLayout === option.value
                      ? 'border-red-500 bg-red-500 bg-opacity-10'
                      : 'border-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-mono text-sm">{option.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-8">
            <button
              onClick={handleSave}
              disabled={!username.trim()}
              className={`w-full py-4 border font-normal tracking-wide transition-colors ${
                username.trim()
                  ? 'border-white text-white hover:bg-white hover:text-black'
                  : 'border-gray-600 text-gray-600 cursor-not-allowed'
              }`}
            >
              SAVE & VIEW PROFILE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
