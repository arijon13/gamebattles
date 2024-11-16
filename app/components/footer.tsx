"use client";

import { useState } from "react";
import LiveBets from "./live-bets";
import Leaderboard from "./leaderboard";
import Information from "./information";

export default function Footer() {
  type SectionType = "mybets" | "livebets" | "highrollers";
  const [activeSection, setActiveSection] = useState<SectionType>("mybets");

  const sections: Record<SectionType, JSX.Element> = {
    mybets: (
      <div className="bg-[#2e3354] p-4 rounded-lg shadow-lg w-[55%] mx-auto">
        <ul className="space-y-1">
          <li>No active bets.</li>
        </ul>
      </div>
    ),
    livebets: <LiveBets />,
    highrollers: (
      <div className="bg-[#2e3354] p-4 rounded-lg shadow-lg w-[55%] mx-auto">
        <ul className="space-y-1">
          <li>Top Bet: 50 BTC</li>
          <li>Player: BigSpender123</li>
        </ul>
      </div>
    ),
  };

  return (
    <footer className="bg-[#1f2236] text-[#c3c8f3] py-10 w-full">
      <div className="flex flex-col px-6 mx-auto space-y-8 w-full max-w-5xl">
        {/* Tabs for My Bets, Live Bets, High Rollers */}
        <div>
          <div className="flex justify-center space-x-6 mb-4">
            <button
              onClick={() => setActiveSection("mybets")}
              className={`px-4 py-2 rounded-lg ${
                activeSection === "mybets" ? "bg-[#00d4ff] text-white" : "bg-[#2e3354] text-cyan-400"
              } hover:bg-[#3c4263] transition-colors`}
            >
              My Bets
            </button>
            <button
              onClick={() => setActiveSection("livebets")}
              className={`px-4 py-2 rounded-lg ${
                activeSection === "livebets" ? "bg-[#00d4ff] text-white" : "bg-[#2e3354] text-cyan-400"
              } hover:bg-[#3c4263] transition-colors`}
            >
              Live Bets
            </button>
            <button
              onClick={() => setActiveSection("highrollers")}
              className={`px-4 py-2 rounded-lg ${
                activeSection === "highrollers" ? "bg-[#00d4ff] text-white" : "bg-[#2e3354] text-cyan-400"
              } hover:bg-[#3c4263] transition-colors`}
            >
              High Rollers
            </button>
          </div>
          {sections[activeSection]}
        </div>

        {/* Leaderboard Section */}
        <Leaderboard />

        {/* Footer Links Section */}
        <Information />
      </div>
    </footer>
  );
}
