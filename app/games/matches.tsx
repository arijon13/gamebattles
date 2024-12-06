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
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [searchingFor, setSearchingFor] = useState<number | null>(null);
  const [filteredMatches, setFilteredMatches] = useState(matches);
  const [allMatches, setAllMatches] = useState(matches);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  
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
    
    const matchFound = filteredMatches.find(match => {
      const matchFee = parseFloat(match.entryFee.replace('$', ''));
      return Math.abs(matchFee - amount) <= 5;
    });

    setTimeout(() => {
      if (matchFound) {
        setSelectedMatch(matchFound);
        setShowModal(true);
      } else {
        showNoMatchFoundMessage();
      }
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

  const showMatchFoundModal = (match: Match) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#1f2236] p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 transform animate-fadeIn">
          <h2 className="text-2xl font-bold text-white mb-6">Match Found!</h2>
          
          <div className="bg-[#292d3e] rounded-lg p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={match.image || "/images/placeholder.jpg"}
                alt="Game"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="text-cyan-400 font-semibold">Entry Fee: {match.entryFee}</p>
                <p className="text-gray-300">Region: {match.region}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300">Team Size: {match.teamSize}</p>
              {match.matchType && (
                <p className="text-gray-300">Match Type: {match.matchType}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => router.push(`/games/match/${match.id}`)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 
                       text-white font-bold rounded-lg shadow-lg
                       hover:from-green-600 hover:to-green-800
                       transform hover:scale-105 transition-all duration-200"
            >
              Join Match
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 
                       text-white font-bold rounded-lg shadow-lg
                       hover:from-red-600 hover:to-red-800
                       transform hover:scale-105 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const showNoMatchFoundMessage = () => {
    alert("No match found. Please try again or adjust your search criteria.");
    // TODO: Implementer en proper notification komponent
  };

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

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent my-8" />

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

        {/* Wrapper for hele seksjonen */}
        <div className="overflow-y-auto no-scrollbar h-full">
          {/* Table wrapper */}
          <div className="overflow-x-auto no-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0">
            <div className="min-w-[800px] sm:w-full">
              {filteredMatches.length > 0 ? (
                <div className="overflow-x-auto no-scrollbar rounded-xl shadow-2xl">
                  <table className="w-full text-white bg-[#1f2236] rounded-xl border-separate border-spacing-0">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#2a2f48] to-[#1f2236] sticky top-0 z-10">
                        <th className="p-4 text-center text-sm uppercase tracking-wider text-cyan-400 font-semibold first:rounded-tl-xl">Match</th>
                        <th className="p-4 text-center text-sm uppercase tracking-wider text-cyan-400 font-semibold">Entry Fee</th>
                        <th className="p-4 text-center text-sm uppercase tracking-wider text-cyan-400 font-semibold">Team Size</th>
                        <th className="p-4 text-center text-sm uppercase tracking-wider text-cyan-400 font-semibold">Region</th>
                        {hasMatchType && <th className="p-4 text-center text-sm uppercase tracking-wider text-cyan-400 font-semibold">Match Type</th>}
                        <th className="p-4 text-center text-sm uppercase tracking-wider text-cyan-400 font-semibold last:rounded-tr-xl">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMatches.map((match, index) => (
                        <tr
                          key={match.id}
                          className={`
                            ${index % 2 === 0 ? "bg-[#1f2236]" : "bg-[#292d3e]/50"}
                            hover:bg-[#2a2f48] transition-all duration-200
                            transform hover:scale-[1.01] hover:shadow-lg
                            cursor-pointer
                          `}
                        >
                          <td className="p-4">
                            <div className="flex items-center justify-center space-x-3">
                              <img
                                src={match.image || "/images/placeholder.jpg"}
                                alt={match.matchType || "Match Thumbnail"}
                                className="w-16 h-16 rounded-lg object-cover
                                         border-2 border-[#3e445c] shadow-lg
                                         transform hover:scale-110 transition-all duration-200"
                              />
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <span className="px-4 py-1.5 bg-cyan-500/10 rounded-full font-semibold text-cyan-400">
                              {match.entryFee}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="px-4 py-1.5 bg-blue-500/10 rounded-full font-semibold text-blue-400">
                              {match.teamSize}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="px-4 py-1.5 bg-purple-500/10 rounded-full font-semibold text-purple-400">
                              {match.region}
                            </span>
                          </td>
                          {hasMatchType && (
                            <td className="p-4 text-center">
                              <span className="px-4 py-1.5 bg-indigo-500/10 rounded-full font-semibold text-indigo-400">
                                {match.matchType || "N/A"}
                              </span>
                            </td>
                          )}
                          <td className="p-4 text-center">
                            <button
                              onClick={() => router.push(`/games/match/${match.id}`)}
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
      </div>

      <CreateMatch
        isOpen={isPopupOpen}
        onCreate={handleCreateMatch}
        onClose={() => setIsPopupOpen(false)}
        gameImage={currentGameData.gameImage}
        gameId={currentGameId}
      />

      {showModal && selectedMatch && showMatchFoundModal(selectedMatch)}
    </div>
  );
}
