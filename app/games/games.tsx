"use client";

import { useState } from "react";
import Matches, { Match } from "./matches";
import Tournaments, { Tournament } from "./tournaments";

interface Criteria {
  regions: string[];
  teamSizes: string[];
  matchTypes: string[]; // Oppdatert navn fra fightTypes
}

interface GameProps {
  gameId: string;
  gameImage: string;
  matches: Match[];
  tournaments: Tournament[];
  criteria: Criteria; // Kriterier for filtrering
}

export default function Games({
  gameId,
  gameImage,
  matches,
  tournaments,
  criteria,
}: GameProps) {
  const [activeSection, setActiveSection] = useState<"matches" | "tournaments">(
    "matches"
  );

  return (
    <div>
      {/* Game Banner */}
      <div
        className="game-banner flex items-center justify-center text-white text-4xl font-extrabold shadow-lg"
        style={{
          backgroundImage: `url(${gameImage})`,
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {gameId.toUpperCase()}
      </div>

      {/* Matches/Tournaments Buttons + Filters */}
      <div className="bg-[#1f2236] p-6 mt-6 rounded-xl text-white shadow-md">
        {/* Section Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-8 py-3 rounded-lg font-bold text-white transition-transform ${
              activeSection === "matches"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg scale-105"
                : "bg-[#292d3e] hover:bg-cyan-500 hover:scale-105"
            }`}
            onClick={() => setActiveSection("matches")}
          >
            Matches
          </button>
          <button
            className={`px-8 py-3 rounded-lg font-bold text-white transition-transform ${
              activeSection === "tournaments"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg scale-105"
                : "bg-[#292d3e] hover:bg-cyan-500 hover:scale-105"
            }`}
            onClick={() => setActiveSection("tournaments")}
          >
            Tournaments
          </button>
        </div>

        {/* Criteria Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* Region Filter */}
          <div className="relative">
            <select className="appearance-none bg-[#292d3e] p-3 rounded-md text-sm text-white shadow-md focus:outline-none focus:ring focus:ring-cyan-500">
              <option value="" disabled hidden>
                Select Region
              </option>
              {criteria?.regions?.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-cyan-500 pointer-events-none">
              ▼
            </span>
          </div>

          {/* Team Size Filter */}
          <div className="relative">
            <select className="appearance-none bg-[#292d3e] p-3 rounded-md text-sm text-white shadow-md focus:outline-none focus:ring focus:ring-cyan-500">
              <option value="" disabled hidden>
                Select Team Size
              </option>
              {criteria?.teamSizes?.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-cyan-500 pointer-events-none">
              ▼
            </span>
          </div>

          {/* Match Type Filter */}
          <div className="relative">
            <select className="appearance-none bg-[#292d3e] p-3 rounded-md text-sm text-white shadow-md focus:outline-none focus:ring focus:ring-cyan-500">
              <option value="" disabled hidden>
                Select Match Type
              </option>
              {criteria?.matchTypes?.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              )) || <option disabled>No Match Types Available</option>}
            </select>
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-cyan-500 pointer-events-none">
              ▼
            </span>
          </div>
        </div>
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
