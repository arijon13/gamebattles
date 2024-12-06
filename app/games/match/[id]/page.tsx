"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function MatchPage() {
  const params = useParams();

  return (
    <div className="min-h-screen bg-[#10132b] relative overflow-hidden">
      <div className="max-w-5xl mx-auto p-8">
        {/* FC Header */}
        <div className="bg-[#1E1F3B]/30 rounded-3xl overflow-hidden backdrop-blur-sm 
                    border border-[#86d9f9]/5 p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image 
              src="/images/games/fc.jpg"
              alt="EA SPORTS FC 25"
              width={50}
              height={50}
              className="object-contain rounded-lg"
            />
            <div>
              <h2 className="text-2xl font-bold text-[#86d9f9]">EA SPORTS FC 25</h2>
              <p className="text-[#86d9f9]/60 text-sm">Ultimate Team</p>
            </div>
          </div>
          
          {/* LIVE Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-red-500 font-bold tracking-wider">LIVE</span>
          </div>
        </div>

        {/* Battle Container */}
        <div className="bg-[#1E1F3B]/30 rounded-3xl overflow-hidden backdrop-blur-sm relative
                    border border-[#86d9f9]/5 shadow-[0_0_100px_-12px_rgba(0,231,255,0.2)]">
          <div className="relative h-[400px]">
            {/* VS Effect Image */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl">
              <Image 
                src="/images/effects/vs-effect.jpg"
                alt="VS Effect"
                width={1200}
                height={600}
                className="object-cover w-full"
                priority
              />
            </div>

            {/* Player Names and Status */}
            <div className="absolute inset-0 flex justify-between px-20 pt-8">
              {/* Player 1 - Red side with blue text */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#00e7ff] mb-2 tracking-wider drop-shadow-[0_0_10px_rgba(0,231,255,0.5)]">
                  Player 1
                </h2>
                <span className="text-[#00e7ff] text-sm font-semibold tracking-[0.2em]">READY FOR BATTLE</span>
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex justify-between text-[#00e7ff] mb-1">
                      <span className="text-sm tracking-wider">Winrate</span>
                      <span className="text-sm font-bold">68%</span>
                    </div>
                    <div className="w-full bg-[#1E1F3B]/50 h-2 rounded-full">
                      <div className="h-full bg-[#00e7ff] rounded-full w-[68%] transition-all duration-500
                                  shadow-[0_0_10px_rgba(0,231,255,0.5)]"></div>
                    </div>
                  </div>
                  <p className="text-[#00e7ff] tracking-wider">Games: <span className="font-bold">156</span></p>
                  <p className="text-[#00e7ff] tracking-wider">Earnings: <span className="font-bold">$1,240</span></p>
                </div>
              </div>

              {/* Player 2 - Blue side with red text */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#ff4444] mb-2 tracking-wider drop-shadow-[0_0_10px_rgba(255,68,68,0.5)]">
                  Player 2
                </h2>
                <span className="text-[#ff4444] text-sm font-semibold tracking-[0.2em]">READY FOR BATTLE</span>
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex justify-between text-[#ff4444] mb-1">
                      <span className="text-sm tracking-wider">Winrate</span>
                      <span className="text-sm font-bold">72%</span>
                    </div>
                    <div className="w-full bg-[#1E1F3B]/50 h-2 rounded-full">
                      <div className="h-full bg-[#ff4444] rounded-full w-[72%] transition-all duration-500
                                  shadow-[0_0_10px_rgba(255,68,68,0.5)]"></div>
                    </div>
                  </div>
                  <p className="text-[#ff4444] tracking-wider">Games: <span className="font-bold">203</span></p>
                  <p className="text-[#ff4444] tracking-wider">Earnings: <span className="font-bold">$1,890</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Match Chat */}
        <div className="mt-8 bg-[#1E1F3B]/30 rounded-2xl overflow-hidden backdrop-blur-sm
                    border border-[#86d9f9]/5">
          <div className="p-4 border-b border-[#86d9f9]/10">
            <h3 className="text-xl font-bold text-[#86d9f9]">Match Chat</h3>
          </div>
          
          <div className="h-64 p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#1E1F3B] flex items-center justify-center">
                <span className="text-sm text-[#00e7ff] font-bold">GB</span>
              </div>
              <div>
                <p className="text-sm text-[#86d9f9]">GameBattles</p>
                <div className="mt-1 p-3 rounded-lg bg-[#1E1F3B]/50">
                  <p className="text-white">Welcome to the match! Remember to play fair - cheating will result in a permanent ban.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-[#86d9f9]/10">
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 bg-[#1E1F3B]/50 text-white rounded-lg px-4 py-2 
                        border border-[#86d9f9]/10 focus:outline-none focus:border-[#00e7ff]"
              />
              <button className="px-4 py-2 bg-[#00e7ff] text-[#1E1F3B] font-semibold rounded-lg">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 