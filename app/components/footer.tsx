"use client";

import LiveBets from "./live-bets";
import Leaderboard from "./leaderboard";
import Information from "./information";

export default function Footer() {
  return (
    <footer className="bg-[#1f2236] text-[#c3c8f3] py-6 w-full">
      <div className="flex flex-col space-y-4 px-6 mx-auto w-full max-w-5xl">
        {/* LiveBets Section */}
        <LiveBets />

        {/* Leaderboard Section */}
        <Leaderboard />

        {/* Footer Information Section */}
        <Information />
      </div>
    </footer>
  );
}
