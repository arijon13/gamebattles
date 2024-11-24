"use client";

import LiveBets from "./live-bets";
import Leaderboard from "./leaderboard";
import Information from "./information";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] text-[#c3c8f3] py-10">
      <div className="flex flex-col space-y-8 px-6 mx-auto w-full max-w-5xl">
        {/* LiveBets Section */}
        <div className="bg-gradient-to-b from-[#1e233b] to-[#14182d] rounded-lg shadow-xl p-6">
          <LiveBets />
        </div>

        {/* Leaderboard Section */}
        <div className="bg-gradient-to-b from-[#1e233b] to-[#14182d] rounded-lg shadow-xl p-6">
          <Leaderboard />
        </div>

        {/* Footer Information Section */}
        <div className="bg-gradient-to-b from-[#1e233b] to-[#14182d] rounded-lg shadow-xl p-6">
          <Information />
        </div>
      </div>
    </footer>
  );
}
