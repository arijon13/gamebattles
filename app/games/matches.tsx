"use client";

import { useState, useEffect, useMemo } from "react";
import GameSearching from "./game-searching";
import GameFilters from "./game-filters";
import CreateMatch from "./creatematch";
import { fortniteData } from "./fortnite/fortnitedata";
import { fifaData } from "./fifa/fifadata";
import { rocketleagueData } from './rocketleague/rocketleaguedata';
import { apexlegendsData } from './apexlegends/apexlegendsdata';
import { GameData } from './types';

// Game button configuration for cleaner rendering
const GAME_BUTTONS = [
  { id: 'fortnite', label: 'Fortnite' },
  { id: 'fifa', label: 'FIFA' },
  { id: 'rocketleague', label: 'Rocket League' },
  { id: 'apexlegends', label: 'Apex Legends' }
] as const;

// Game criteria configuration
const GAME_CRITERIA = {
  fortnite: {
    regions: ["EU", "NA", "ASIA", "SA"],
    teamSizes: ["1v1", "2v2", "3v3", "4v4"],
    matchTypes: ["Build Mode", "No Build Mode"],
    showRegion: true
  },
  fifa: {
    regions: [],
    teamSizes: ["1v1", "Pro Clubs"],
    matchTypes: ["Standard", "Knockout", "Round Robin"],
    showRegion: false
  },
  rocketleague: {
    regions: ["EU", "NA", "OCE"],
    teamSizes: ["1v1", "2v2", "3v3"],
    matchTypes: ["Best of 1", "Best of 3", "Best of 5"],
    showRegion: true
  },
  apexlegends: {
    regions: ["EU", "NA", "ASIA", "OCE"],
    teamSizes: ["1v1", "2v2", "3v3"],
    matchTypes: ["Battle Royale", "Arenas", "Control"],
    showRegion: true
  }
};

// Types
export interface Match {
  id: number;
  image: string;
  gameId: string;
  entryFee: string;
  teamSize: string;
  region: string;
  matchType: string;
}

interface MatchesProps {
  matches: Match[];
  criteria: {
    regions: string[];
    teamSizes: string[];
    matchTypes: string[];
    showRegion: boolean;
  };
  currentGameId: string;
}

export default function Matches({ matches, criteria, currentGameId }: MatchesProps) {
  const [searchingFor, setSearchingFor] = useState<number | null>(null);
  const [filteredMatches, setFilteredMatches] = useState(matches);
  const [allMatches, setAllMatches] = useState(matches);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // Get initial game data based on currentGameId
  const [currentGameData, setCurrentGameData] = useState(() => {
    const gameDataMap = {
      fifa: fifaData,
      fortnite: fortniteData,
      rocketleague: rocketleagueData,
      apexlegends: apexlegendsData
    };
    return gameDataMap[currentGameId as keyof typeof gameDataMap] || fifaData;
  });

  const handleSearch = (amount: number) => {
    setSearchingFor(amount);
    setTimeout(() => {
      alert(`Searching for a match with $${amount} entry fee...`);
      setSearchingFor(null);
    }, 3000);
  };

  const handleFilterChange = (filters: {
    region: string;
    teamSize: string;
    matchType: string;
  }) => {
    const { region, teamSize, matchType } = filters;
    setFilteredMatches(allMatches.filter((match) => (
      match.gameId === currentGameData.id &&
      (!region || match.region === region) &&
      (!teamSize || match.teamSize === teamSize) &&
      (!matchType || match.matchType === matchType)
    )));
  };

  const handleCreateMatch = (newMatch: Match) => {
    const matchWithGame = {
      ...newMatch,
      gameId: currentGameData.id,
      image: currentGameData.gameImage,
    };
    setAllMatches(prev => [...prev, matchWithGame]);
    setFilteredMatches(prev => [...prev, matchWithGame]);
    setIsPopupOpen(false);
  };

  const handleChangeGame = (game: keyof typeof GAME_CRITERIA) => {
    const gameDataMap = {
      fifa: fifaData,
      fortnite: fortniteData,
      rocketleague: rocketleagueData,
      apexlegends: apexlegendsData
    };
    
    setCurrentGameData({
      ...gameDataMap[game],
      criteria: GAME_CRITERIA[game]
    });
  };

  const hasMatchType = useMemo(() => 
    allMatches.some((match) => match.matchType),
    [allMatches]
  );

  return (
    <div className="bg-gradient-to-b from-[#1f2236] to-[#292d3e] p-8 rounded-xl shadow-2xl animate-fadeIn">
      {/* Game Selection */}
      <div className="flex flex-wrap gap-4 mb-6">
        {GAME_BUTTONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleChangeGame(id as keyof typeof GAME_CRITERIA)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 
                     text-white font-bold rounded-lg shadow-lg
                     hover:from-blue-600 hover:to-blue-800
                     transform hover:scale-105 transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {label}
          </button>
        ))}
      </div>

      <GameSearching onSearch={handleSearch} searchingFor={searchingFor} />

      <div className="w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full my-8"></div>

      <GameFilters
        regions={currentGameData.criteria.regions}
        teamSizes={currentGameData.criteria.teamSizes}
        matchTypes={currentGameData.criteria.matchTypes}
        onFilterChange={handleFilterChange}
      />

      {/* Matches Section - Added more margin-top (mt-16 instead of mt-8) */}
      <div className="mt-8 sm:mt-16 animate-slideUp">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text 
                         bg-gradient-to-r from-white to-gray-300">
            Available Matches
          </h2>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-white rounded-lg
                     bg-gradient-to-r from-cyan-500 to-blue-500
                     hover:from-cyan-600 hover:to-blue-600
                     transform hover:scale-105 transition-all duration-200
                     shadow-lg hover:shadow-xl"
          >
            Create Match
          </button>
        </div>

        {/* Table wrapper with horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="min-w-[800px] sm:w-full">
            {filteredMatches.length > 0 ? (
              <div className="overflow-x-auto no-scrollbar rounded-xl shadow-2xl">
                <table className="w-full text-white bg-[#1f2236] rounded-xl border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#2a2f48] to-[#1f2236]">
                      <th className="p-4 text-center text-sm uppercase text-cyan-400 font-semibold">Match</th>
                      <th className="p-4 text-center text-sm uppercase text-cyan-400 font-semibold">Entry Fee</th>
                      <th className="p-4 text-center text-sm uppercase text-cyan-400 font-semibold">Team Size</th>
                      <th className="p-4 text-center text-sm uppercase text-cyan-400 font-semibold">Region</th>
                      {hasMatchType && <th className="p-4 text-center text-sm uppercase text-cyan-400 font-semibold">Match Type</th>}
                      <th className="p-4 text-center text-sm uppercase text-cyan-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMatches.map((match, index) => (
                      <tr
                        key={match.id}
                        className={`
                          ${index % 2 === 0 ? "bg-[#1f2236]" : "bg-[#292d3e]"}
                          hover:bg-[#2a2f48] transition-all duration-200
                          transform hover:scale-[1.01]
                        `}
                      >
                        <td className="p-4 text-center">
                          <div className="flex flex-col items-center">
                            <img
                              src={match.image || "/images/placeholder.jpg"}
                              alt={match.matchType || "Match Thumbnail"}
                              className="w-16 h-16 rounded-lg object-cover
                                       border-2 border-[#3e445c] shadow-lg
                                       transform hover:scale-110 transition-all duration-200"
                            />
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold text-cyan-400">
                          {match.entryFee}
                        </td>
                        <td className="p-4 text-center font-semibold text-gray-200">
                          {match.teamSize}
                        </td>
                        <td className="p-4 text-center font-semibold text-gray-200">
                          {match.region}
                        </td>
                        {hasMatchType && (
                          <td className="p-4 text-center font-semibold text-gray-200">
                            {match.matchType || "N/A"}
                          </td>
                        )}
                        <td className="p-4 text-center">
                          <button
                            className="px-6 py-2 text-sm font-bold text-white rounded-lg
                                     bg-gradient-to-r from-green-500 to-green-700
                                     hover:from-green-600 hover:to-green-800
                                     transform hover:scale-105 transition-all duration-200
                                     shadow-lg hover:shadow-xl"
                          >
                            Accept
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-[#1f2236] rounded-xl border border-[#3d4674]">
                <p className="text-xl font-bold text-gray-300 mb-2">No matches available</p>
                <p className="text-gray-400">Be the first to create a match or adjust your filters!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateMatch
        isOpen={isPopupOpen}
        onCreate={handleCreateMatch}
        onClose={() => setIsPopupOpen(false)}
        gameImage={currentGameData.gameImage}
        gameId={currentGameId}
      />
    </div>
  );
}
