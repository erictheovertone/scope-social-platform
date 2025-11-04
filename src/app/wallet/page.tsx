"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomToolbar from "@/components/BottomToolbar";

export default function Wallet() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('balances');

  return (
    <div className="bg-black relative w-[375px] h-[812px] mx-auto text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-6">
        <button onClick={() => router.push('/')} className="text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 style={{ fontFamily: 'TestSöhne-Halbfett, IBM Plex Mono, monospace' }} className="font-medium text-white text-[18px] tracking-[-0.36px]">
          SCOPE
        </h1>
        <button className="text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex items-center justify-between px-4 mb-8">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-[#FF0000] rounded-full mr-3 flex items-center justify-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
          </div>
          <div>
            <p style={{ fontFamily: 'TestSöhne-Halbfett, IBM Plex Mono, monospace' }} className="font-medium text-white text-[16px] tracking-[-0.32px]">
              @whoisbert
            </p>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <p style={{ fontFamily: 'TestSöhne-Halbfett, IBM Plex Mono, monospace' }} className="font-normal text-[#888888] text-[12px] tracking-[-0.24px]">
                0xc6b0...4cf9
              </p>
            </div>
          </div>
        </div>
        <div className="w-16 h-16 bg-[#FF0000] rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-orange-500 rounded-full"></div>
        </div>
      </div>

      {/* Balance */}
      <div className="text-center mb-8">
        <p style={{ fontFamily: 'TestSöhne-Halbfett, IBM Plex Mono, monospace' }} className="font-normal text-[#888888] text-[14px] tracking-[-0.28px] mb-2">
          Total available balance
        </p>
        <p style={{ fontFamily: 'TestSöhne-Halbfett, IBM Plex Mono, monospace' }} className="font-bold text-white text-[48px] tracking-[-0.96px] leading-[1.1]">
          $4.01
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mb-8 px-4">
        <button style={{ fontFamily: 'TestSöhne-Halbfett, IBM Plex Mono, monospace' }} className="bg-[#333333] text-white px-6 py-3 rounded-full font-medium text-[14px] tracking-[-0.28px] flex items-center hover:bg-[#444444] transition-colors">
          <span className="mr-2">+</span>
          Add money
        </button>
        <button style={{ fontFamily: 'TestSöhne-Halbfett, IBM Plex Mono, monospace' }} className="bg-[#333333] text-white px-6 py-3 rounded-full font-medium text-[14px] tracking-[-0.28px] flex items-center hover:bg-[#444444] transition-colors">
          <span className="mr-2">$</span>
          Cash out
        </button>
        <button style={{ fontFamily: 'TestSöhne-Halbfett, IBM Plex Mono, monospace' }} className="bg-[#333333] text-white px-6 py-3 rounded-full font-medium text-[14px] tracking-[-0.28px] flex items-center hover:bg-[#444444] transition-colors">
          <span className="mr-2">↗</span>
          Send
        </button>
      </div>

      {/* Token Card */}
      <div className="mx-4 mb-6">
        <div className="bg-[#1A1A1A] rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-[#FF0000] rounded-full mr-3 flex items-center justify-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
            </div>
            <div>
              <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] tracking-[-0.28px]">
                $whoisbert
              </p>
              <p className="font-['IBM_Plex_Mono'] font-normal text-[#888888] text-[12px] tracking-[-0.24px]">
                2,530,707,763
              </p>
            </div>
          </div>
          <button className="bg-white text-black px-6 py-2 rounded-full font-['IBM_Plex_Mono'] font-medium text-[12px] tracking-[-0.24px]">
            Claim
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#333333] mx-4 mb-6">
        <button 
          onClick={() => setActiveTab('balances')}
          className={`flex-1 pb-3 font-['IBM_Plex_Mono'] font-medium text-[14px] tracking-[-0.28px] ${
            activeTab === 'balances' 
              ? 'text-white border-b-2 border-white' 
              : 'text-[#888888]'
          }`}
        >
          Balances
        </button>
        <button 
          onClick={() => setActiveTab('holdings')}
          className={`flex-1 pb-3 font-['IBM_Plex_Mono'] font-medium text-[14px] tracking-[-0.28px] ${
            activeTab === 'holdings' 
              ? 'text-white border-b-2 border-white' 
              : 'text-[#888888]'
          }`}
        >
          Holdings
        </button>
      </div>

      {/* Available Balance Section */}
      {activeTab === 'balances' && (
        <div className="px-4">
          <div className="mb-4">
            <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[16px] tracking-[-0.32px] mb-1">
              Available balance
            </p>
            <p className="font-['IBM_Plex_Mono'] font-normal text-[#888888] text-[12px] tracking-[-0.24px]">
              These contribute to your total available balance
            </p>
          </div>

          {/* Token List */}
          <div className="space-y-4">
            {/* ZORA Token */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mr-3"></div>
                <div>
                  <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] tracking-[-0.28px]">
                    ZORA
                  </p>
                  <p className="font-['IBM_Plex_Mono'] font-normal text-[#888888] text-[12px] tracking-[-0.24px]">
                    59.235 ZORA
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] tracking-[-0.28px]">
                  $4.01
                </p>
                <p className="font-['IBM_Plex_Mono'] font-normal text-[#FF69B4] text-[12px] tracking-[-0.24px]">
                  ♥ 3.8%
                </p>
              </div>
            </div>

            {/* Sparks Token */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#333333] rounded-full mr-3 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] tracking-[-0.28px]">
                    Sparks
                  </p>
                  <p className="font-['IBM_Plex_Mono'] font-normal text-[#888888] text-[12px] tracking-[-0.24px]">
                    ✧ 0
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] tracking-[-0.28px]">
                  &lt;$0.01
                </p>
              </div>
            </div>

            {/* USDC Token */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-white font-bold text-[12px]">$</span>
                </div>
                <div>
                  <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] tracking-[-0.28px]">
                    USDC
                  </p>
                  <p className="font-['IBM_Plex_Mono'] font-normal text-[#888888] text-[12px] tracking-[-0.24px]">
                    0 USDC
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] tracking-[-0.28px]">
                  $0
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomToolbar />
    </div>
  );
}
