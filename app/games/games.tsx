"use client";

import { useState, useEffect } from "react";
import Matches, { Match } from "./matches";
import Tournaments, { Tournament } from "./tournaments";
import { SparklesIcon, TrophyIcon } from "@heroicons/react/24/outline";

interface Criteria {
  regions: string[];
  teamSizes: string[];
  matchTypes: string[];
  showRegion: boolean;
}

interface GameProps {
  gameId: string;
  gameImage: string;
  matches: Match[];
  tournaments: Tournament[];
  criteria: Criteria;
}

export default function Games({
  gameId,
  gameImage,
  matches,
  tournaments,
  criteria,
}: GameProps) {
  const [activeSection, setActiveSection] = useState<"matches" | "tournaments">("matches");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = gameImage;
    img.onload = () => setIsImageLoaded(true);
  }, [gameImage]);

  const handleSectionChange = (section: "matches" | "tournaments") => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSection(section);
      setIsTransitioning(false);
    }, 300); // Match this with the CSS transition duration
  };

  return (
    <div className="opacity-0 animate-fadeIn">
      {/* Enhanced Game Banner with Parallax Effect */}
      <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl group">
        <div
          className="absolute inset-0 bg-cover bg-center transform transition-all duration-700 
                     group-hover:scale-105 group-hover:filter group-hover:brightness-75"
          style={{
            backgroundImage: `url(${gameImage})`,
            filter: "brightness(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        {/* Animated Game Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative">
            <h1 className="text-7xl font-black text-white tracking-wider drop-shadow-2xl
                          bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80
                          hover:from-cyan-400 hover:to-blue-500 transition-all duration-300
                          cursor-default transform hover:scale-105 z-10">
              {gameId.toUpperCase()}
            </h1>
            {/* Glowing Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 
                          group-hover:opacity-20 blur-xl transition-all duration-500" />
          </div>
          {/* Animated Subtitle */}
          <p className="mt-4 text-xl text-cyan-400/80 font-medium tracking-wide
                       transform transition-all duration-300 opacity-0 translate-y-4
                       group-hover:opacity-100 group-hover:translate-y-0">
            Join the Battle. Claim Victory.
          </p>
        </div>
      </div>

      {/* Updated Navigation Section */}
      <div className="bg-gradient-to-b from-[#1a1d31] to-[#1f2236] p-4 sm:p-8 mt-8 
                      shadow-xl border border-[#3d4674] backdrop-blur-sm
                      animate-slideUp w-full">
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 max-w-4xl mx-auto">
          <button
            onClick={() => handleSectionChange("matches")}
            className={`group relative px-6 sm:px-20 py-4 rounded-xl font-bold text-lg transition-all duration-300
                       w-full sm:w-80 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 overflow-hidden
                       ${activeSection === "matches"
                         ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                         : "bg-[#292d3e] text-gray-300 hover:text-white"
                       }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center justify-center gap-2">
              <SparklesIcon className="w-6 h-6" />
              <span>Matches</span>
            </div>
            {/* Animated Border */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-500 to-blue-500 
                          transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </button>

          <button
            onClick={() => handleSectionChange("tournaments")}
            className={`group relative px-6 sm:px-20 py-4 rounded-xl font-bold text-lg transition-all duration-300
                       w-full sm:w-80 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1 overflow-hidden
                       ${activeSection === "tournaments"
                         ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                         : "bg-[#292d3e] text-gray-300 hover:text-white"
                       }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center justify-center gap-2">
              <TrophyIcon className="w-6 h-6" />
              <span>Tournaments</span>
            </div>
            {/* Animated Border */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-500 to-blue-500 
                          transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Updated Content Section with Smooth Transition */}
      <div className={`section-content transition-all duration-300 
                      ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        {activeSection === "matches" ? (
          <Matches 
            matches={matches} 
            criteria={criteria}
            currentGameId={gameId}
          />
        ) : (
          <Tournaments tournaments={tournaments} />
        )}
      </div>
    </div>
  );
}
