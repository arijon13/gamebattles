"use client";

import { useState } from "react";

export default function LiveBets() {
  type SectionType = "mybets" | "livebets" | "highrollers";
  const [activeSection, setActiveSection] = useState<SectionType>("mybets");

  const sections: Record<SectionType, JSX.Element> = {
    mybets: (
      <div className="bg-[#1a1b32] p-4 rounded-xl shadow-md w-full">
        <ul className="space-y-2">
          <li className="text-center text-[#c3c8f3]">No active bets.</li>
        </ul>
      </div>
    ),
    livebets: (
      <div className="bg-[#1a1b32] p-4 rounded-xl shadow-md w-full">
        <p className="text-center text-[#c3c8f3]">Here are the live bets!</p>
      </div>
    ),
    highrollers: (
      <div className="bg-[#1a1b32] p-4 rounded-xl shadow-md w-full">
        <ul className="space-y-2">
          <li className="text-[#86d9f9]">Top Bet: <span className="text-[#00d4ff]">50 BTC</span></li>
          <li className="text-[#86d9f9]">Player: <span className="text-[#00d4ff]">BigSpender123</span></li>
        </ul>
      </div>
    ),
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] text-[#c3c8f3] p-6 rounded-xl shadow-2xl w-full max-w-5xl mx-auto mb-8">
      <h3 className="text-2xl font-bold text-[#00e7ff] mb-6 text-center">Live Bets</h3>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveSection("mybets")}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            activeSection === "mybets"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md scale-105"
              : "bg-[#292d3e] text-cyan-400 hover:scale-105 hover:bg-cyan-500"
          }`}
        >
          My Bets
        </button>
        <button
          onClick={() => setActiveSection("livebets")}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            activeSection === "livebets"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md scale-105"
              : "bg-[#292d3e] text-cyan-400 hover:scale-105 hover:bg-cyan-500"
          }`}
        >
          Live Bets
        </button>
        <button
          onClick={() => setActiveSection("highrollers")}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            activeSection === "highrollers"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md scale-105"
              : "bg-[#292d3e] text-cyan-400 hover:scale-105 hover:bg-cyan-500"
          }`}
        >
          High Rollers
        </button>
      </div>
      <div>{sections[activeSection]}</div>
    </div>
  );
}
