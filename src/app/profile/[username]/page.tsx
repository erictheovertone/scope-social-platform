'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'main' | 'collected'>('main');
  const [zoomLevel, setZoomLevel] = useState<'1x' | '2x'>('2x');
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white hover:text-gray-300">
            ← Back
          </Link>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
            <span className="text-xl font-bold tracking-wider">SCOPE</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Profile Header */}
        <div className="flex items-start space-x-6 mb-8 p-4">
          <div className="w-16 h-16 bg-gray-600 rounded"></div>
          <div className="flex-1">
            <h1 className="text-xl font-bold mb-2">@username</h1>
            <p className="text-sm text-gray-300 mb-4 max-w-md">Profile bio will appear here</p>
            <div className="text-xs text-gray-400 font-mono">
              <span className="mr-6">Value: $742,858</span>
              <span className="mr-6">Work Posts: 1,403</span>
              <span className="mr-6">Collectors: 242</span>
            </div>
          </div>
          
          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <span className="text-sm">2x super wide</span>
            <div className="flex border border-gray-600">
              <button
                onClick={() => setZoomLevel('1x')}
                className={`px-3 py-1 text-xs ${
                  zoomLevel === '1x' ? 'bg-white text-black' : 'text-white'
                }`}
              >
                1x
              </button>
              <button
                onClick={() => setZoomLevel('2x')}
                className={`px-3 py-1 text-xs ${
                  zoomLevel === '2x' ? 'bg-white text-black' : 'text-white'
                }`}
              >
                2x
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-800 mb-6">
          <button
            onClick={() => setActiveTab('main')}
            className={`px-6 py-3 text-sm font-mono ${
              activeTab === 'main'
                ? 'border-b-2 border-white text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Main
          </button>
          <button
            onClick={() => setActiveTab('collected')}
            className={`px-6 py-3 text-sm font-mono ${
              activeTab === 'collected'
                ? 'border-b-2 border-white text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Collected
          </button>
        </div>

        {/* Posts Grid Placeholder */}
        <div className={`${zoomLevel === '1x' ? 'scale-75 origin-top-left' : ''}`}>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800 h-48 rounded"></div>
            <div className="bg-gray-800 h-48 rounded"></div>
            <div className="bg-gray-800 h-48 rounded"></div>
            <div className="bg-gray-800 h-48 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
