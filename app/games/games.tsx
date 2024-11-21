"use client";

import { useState } from "react";
import Matches from "./matches";
import Tournaments from "./tournaments";

interface GameProps {
  gameId: string;
  gameImage: string;
  matches: Match[]; // Ensure Match is properly imported or defined
  tournaments: Tournament[]; // Ensure Tournament is properly imported or defined
}

export default function Games({ gameId, gameImage, matches, tournaments }: GameProps) {
  const [activeSection, setActiveSection] = useState<"matches" | "tournaments">("matches");

  return (
    <div>
      {/* Game Banner */}
      <div
        className="game-banner flex items-center justify-center text-white text-4xl font-bold shadow-lg"
        style={{
          backgroundImage: `url(${gameImage})`,
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {gameId.toUpperCase()}
      </div>

      {/* Section Toggle Buttons */}
      <div className="section-tabs flex justify-center space-x-4 bg-[#1f2236] py-4">
        <button
          className={`px-6 py-2 rounded-md font-medium text-white ${
            activeSection === "matches" ? "bg-cyan-500" : "bg-gray-700"
          }`}
          onClick={() => setActiveSection("matches")}
        >
          Matches
        </button>
        <button
          className={`px-6 py-2 rounded-md font-medium text-white ${
            activeSection === "tournaments" ? "bg-cyan-500" : "bg-gray-700"
          }`}
          onClick={() => setActiveSection("tournaments")}
        >
          Tournaments
        </button>
      </div>

      {/* Section Content */}
      <div className="section-content px-6 py-4">
        {activeSection === "matches" ? (
          <Matches matches={matches} />
        ) : (
          <Tournaments tournaments={tournaments} />
        )}
      </div>
    </div>
  );
}
