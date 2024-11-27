"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Trophy, Medal, Crown, ChevronLeft, ChevronRight } from "lucide-react";

const allPlayers = Array.from({ length: 100 }, (_, i) => ({
  rank: i + 1,
  name: `Player${i + 1}`,
  wagered: `${(5000 - i * 50).toFixed(2)}`,
  winRate: `${Math.floor(80 - i/2)}%`
}));

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-5 h-5 text-yellow-400" />;
    case 2:
      return <Trophy className="w-5 h-5 text-gray-300" />;
    case 3:
      return <Medal className="w-5 h-5 text-amber-700" />;
    default:
      return null;
  }
};

export default function Leaderboard() {
  const [visiblePlayers, setVisiblePlayers] = useState(10);
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;
  
  // Simulated current user rank (replace with actual user rank from your auth system)
  const currentUserRank = 55;

  // Calculate nearby players
  const nearbyPlayers = allPlayers.filter(player => 
    Math.abs(player.rank - currentUserRank) <= 2
  );

  // Pagination logic
  const totalPages = Math.ceil(allPlayers.length / playersPerPage);
  const startIndex = (currentPage - 1) * playersPerPage;
  const endIndex = startIndex + playersPerPage;
  
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="space-y-6 p-6 rounded-2xl bg-gradient-to-b from-[#1a1b32]/80 to-[#0f0f20]/80 backdrop-blur-lg border border-[#2e3354]/30">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00e7ff] to-[#0077ff] bg-clip-text text-transparent">
            Top Players
          </h3>
          <p className="text-sm text-[#86d9f9]/70">
            Weekly rankings based on performance
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 rounded-lg text-sm font-medium
            bg-gradient-to-r from-indigo-500 to-purple-500
            text-white shadow-lg hover:shadow-xl
            transition-all duration-300 border border-indigo-400/20"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </motion.button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden space-y-6"
          >
            {/* Main Leaderboard */}
            <div className="space-y-3">
              {allPlayers.slice(startIndex, endIndex).map((player, index) => (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`
                    relative p-4 rounded-xl 
                    ${player.rank === 1 
                      ? 'bg-gradient-to-r from-[#1a1b32]/90 to-[#2e3354]/90 before:bg-gold-gradient' 
                      : player.rank === 2
                      ? 'bg-gradient-to-r from-[#1a1b32]/90 to-[#2e3354]/90 before:bg-silver-gradient'
                      : player.rank === 3
                      ? 'bg-gradient-to-r from-[#1a1b32]/90 to-[#2e3354]/90 before:bg-bronze-gradient'
                      : 'bg-[#1a1b32]/40'}
                    hover:bg-[#2e3354]/50 transition-all duration-300
                    border border-[#2e3354]/30
                    ${player.rank <= 3 ? 'shadow-lg shadow-[#2e3354]/20' : ''}
                    before:absolute before:inset-0 before:rounded-xl before:p-[2px]
                    before:animate-shine before:-z-10 before:bg-[length:400%_400%]
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className={`
                          w-8 h-8 flex items-center justify-center rounded-lg
                          ${player.rank <= 3 ? 'bg-gradient-to-br from-[#2e3354] to-[#1a1b32]' : 'bg-[#1a1b32]/60'}
                          font-bold text-lg
                          ${player.rank === 1 ? 'text-yellow-400' : 
                            player.rank === 2 ? 'text-gray-300' : 
                            player.rank === 3 ? 'text-amber-700' : 'text-[#86d9f9]'}
                        `}>
                          {getRankIcon(player.rank) || player.rank}
                        </span>
                        <span className="font-semibold text-white">{player.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm text-[#86d9f9]/70">Win Rate</p>
                        <p className="font-semibold text-[#86d9f9]">{player.winRate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[#86d9f9]/70">Wagered</p>
                        <p className="font-mono font-semibold text-[#86d9f9]">{player.wagered} BTC</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-[#2e3354]/50'
                }`}
              >
                <ChevronLeft className="w-6 h-6 text-[#86d9f9]" />
              </motion.button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <motion.button
                      key={pageNumber}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium
                        ${currentPage === pageNumber 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                          : 'text-[#86d9f9] hover:bg-[#2e3354]/50'
                        }`}
                    >
                      {pageNumber}
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-[#2e3354]/50'
                }`}
              >
                <ChevronRight className="w-6 h-6 text-[#86d9f9]" />
              </motion.button>
            </div>

            {/* Your Position Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-8 border-t border-[#2e3354]/30"
            >
              <h4 className="text-xl font-bold text-[#86d9f9] mb-4">Your Position</h4>
              <div className="space-y-2">
                {nearbyPlayers.map((player) => (
                  <motion.div
                    key={player.rank}
                    className={`
                      p-4 rounded-xl 
                      ${player.rank === currentUserRank 
                        ? 'bg-blue-500/20 border-l-4 border-blue-500' 
                        : 'bg-[#1a1b32]/40'}
                      transition-all duration-300
                      border border-[#2e3354]/30
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1b32]/60 font-bold text-lg text-[#86d9f9]">
                            {player.rank}
                          </span>
                          <span className="font-semibold text-white">{player.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-sm text-[#86d9f9]/70">Win Rate</p>
                          <p className="font-semibold text-[#86d9f9]">{player.winRate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-[#86d9f9]/70">Wagered</p>
                          <p className="font-mono font-semibold text-[#86d9f9]">{player.wagered} BTC</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
