"use client";

import { useState } from "react";

export default function LiveBets() {
  type SectionType = "mybets" | "livebets" | "highrollers";
  const [activeSection, setActiveSection] = useState<SectionType>("mybets");

  const sections: Record<SectionType, JSX.Element> = {
    mybets: (
      <div className="bg-[#2e3354] p-4 rounded-lg shadow-lg w-full">
        <ul className="space-y-1">
          <li>No active bets.</li>
        </ul>
      </div>
    ),
    livebets: (
      <div className="bg-[#2e3354] p-4 rounded-lg shadow-lg w-full">
        <p>Here are the live bets!</p>
      </div>
    ),
    highrollers: (
      <div className="bg-[#2e3354] p-4 rounded-lg shadow-lg w-full">
        <ul className="space-y-1">
          <li>Top Bet: 50 BTC</li>
          <li>Player: BigSpender123</li>
        </ul>
      </div>
    ),
  };

  return (
    <div className="bg-[#2e3354] text-[#c3c8f3] p-4 rounded-lg shadow-lg w-full">
      <h3 className="text-lg font-semibold mb-2 text-cyan-300">Live Bets</h3>
      <div className="flex justify-center space-x-4 mb-2">
        <button
          onClick={() => setActiveSection("mybets")}
          className={`px-4 py-2 rounded-lg ${
            activeSection === "mybets" ? "bg-[#00d4ff] text-white" : "bg-[#3c4263] text-cyan-400"
          } hover:bg-[#3c4263] transition-colors`}
        >
          My Bets
        </button>
        <button
          onClick={() => setActiveSection("livebets")}
          className={`px-4 py-2 rounded-lg ${
            activeSection === "livebets" ? "bg-[#00d4ff] text-white" : "bg-[#3c4263] text-cyan-400"
          } hover:bg-[#3c4263] transition-colors`}
        >
          Live Bets
        </button>
        <button
          onClick={() => setActiveSection("highrollers")}
          className={`px-4 py-2 rounded-lg ${
            activeSection === "highrollers" ? "bg-[#00d4ff] text-white" : "bg-[#3c4263] text-cyan-400"
          } hover:bg-[#3c4263] transition-colors`}
        >
          High Rollers
        </button>
      </div>
      <div>{sections[activeSection]}</div>
    </div>
  );
}
