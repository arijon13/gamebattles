"use client";

import { useState } from "react";

export default function Bets() {
  type SectionType = "mybets" | "livebets" | "highrollers";
  const [activeSection, setActiveSection] = useState<SectionType>("mybets");

  // Innhold for hver seksjon
  const sections: Record<SectionType, JSX.Element> = {
    mybets: <p>No active bets.</p>,
    livebets: <p>FIFA - User123 vs User456 (10 BTC)</p>,
    highrollers: <p>Top Bet: 50 BTC</p>,
  };

  return (
    <div className="bg-[#2e3354] p-6 rounded-lg shadow-lg w-full max-w-[55%] mx-auto">
      {/* Navigasjonsknapper */}
      <div className="flex justify-center space-x-6 mb-4">
        <button
          onClick={() => setActiveSection("mybets")}
          className={`px-4 py-2 rounded-lg ${
            activeSection === "mybets"
              ? "bg-[#00d4ff] text-white"
              : "bg-[#2e3354] text-cyan-400"
          } hover:bg-[#3c4263] transition-colors`}
        >
          My Bets
        </button>
        <button
          onClick={() => setActiveSection("livebets")}
          className={`px-4 py-2 rounded-lg ${
            activeSection === "livebets"
              ? "bg-[#00d4ff] text-white"
              : "bg-[#2e3354] text-cyan-400"
          } hover:bg-[#3c4263] transition-colors`}
        >
          Live Bets
        </button>
        <button
          onClick={() => setActiveSection("highrollers")}
          className={`px-4 py-2 rounded-lg ${
            activeSection === "highrollers"
              ? "bg-[#00d4ff] text-white"
              : "bg-[#2e3354] text-cyan-400"
          } hover:bg-[#3c4263] transition-colors`}
        >
          High Rollers
        </button>
      </div>

      {/* Innhold for aktiv seksjon (bare innholdet, ingen knapper her) */}
      <div className="bg-[#2e3354] p-4 rounded-lg shadow-lg w-full">
        {sections[activeSection]} {/* Her vises kun innholdet for den aktive seksjonen */}
      </div>
    </div>
  );
}
