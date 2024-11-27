"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Crown, ChevronLeft, ChevronRight } from "lucide-react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

interface Player {
  rank: number;
  name: string;
  wagered: string;
  winRate: string;
  earnings: string;
  lastActive: string;
  level: number;
  avatar?: string;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-400" />;
    case 2:
      return <Trophy className="w-6 h-6 text-gray-300" />;
    case 3:
      return <Medal className="w-6 h-6 text-amber-700" />;
    default:
      return null;
  }
};

export default function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;
  const currentUserRank = 55; // Simulated current user rank

  // Mock data for players
  const mockPlayers: Player[] = Array.from({ length: 100 }, (_, index) => ({
    rank: index + 1,
    name: `Player ${index + 1}`,
    wagered: (5000 - index * 50).toFixed(2),
    winRate: `${Math.floor(80 - index/2)}%`,
    earnings: `$${(Math.random() * 5000).toFixed(2)}`,
    lastActive: '1 day ago',
    level: Math.floor(Math.random() * 100),
    avatar: undefined,
  }));

  const [players] = useState<Player[]>(mockPlayers);

  // Pagination logic
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const totalPages = Math.ceil(players.length / playersPerPage);

  // Top 3 players
  const top3Players = players.slice(0, 3);
  
  // Calculate nearby players
  const nearbyPlayers = players.filter(player => 
    Math.abs(player.rank - currentUserRank) <= 2
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00e7ff] to-[#0077ff] bg-clip-text text-transparent">
            Global Rankings
          </h1>
          <p className="text-[#86d9f9]/70 text-lg">
            Top 100 players competing for glory
          </p>
        </motion.div>

        {/* Top 3 Players Podium - Enhanced with shiny borders */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {top3Players.map((player) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                relative p-6 rounded-xl shadow-lg transition-all duration-300
                bg-gradient-to-r from-[#1a1b32]/90 to-[#2e3354]/90
                border border-[#2e3354]/30 w-72
                before:absolute before:inset-0 before:rounded-xl before:p-[2px]
                before:animate-shine before:-z-10 before:bg-[length:400%_400%]
                ${player.rank === 1 
                  ? 'before:bg-gold-gradient shadow-yellow-400/20' 
                  : player.rank === 2
                  ? 'before:bg-silver-gradient shadow-gray-300/20'
                  : 'before:bg-bronze-gradient shadow-amber-700/20'}
              `}
            >
              <div className="flex flex-col items-center">
                <div className={`
                  w-16 h-16 flex items-center justify-center rounded-full
                  bg-gradient-to-br from-[#2e3354] to-[#1a1b32] mb-4
                  ${player.rank === 1 
                    ? 'ring-2 ring-yellow-400/30' 
                    : player.rank === 2
                    ? 'ring-2 ring-gray-300/30'
                    : 'ring-2 ring-amber-700/30'}
                `}>
                  {getRankIcon(player.rank)}
                </div>
                <span className="font-bold text-xl text-white mb-2">{player.name}</span>
                <div className="grid grid-cols-2 gap-4 w-full mt-4">
                  <div className="text-center p-3 rounded-lg bg-[#1a1b32]/40">
                    <p className="text-sm text-[#86d9f9]/70">Win Rate</p>
                    <p className="font-semibold text-[#86d9f9]">{player.winRate}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-[#1a1b32]/40">
                    <p className="text-sm text-[#86d9f9]/70">Wagered</p>
                    <p className="font-mono font-semibold text-[#86d9f9]">{player.wagered} BTC</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Players List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {currentPlayers.slice(3).map((player) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl transition-all duration-300
                bg-[#1a1b32]/40 hover:bg-[#2e3354]/50
                border border-[#2e3354]/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-10 h-10 flex items-center justify-center rounded-lg
                      bg-[#1a1b32]/60 font-bold text-lg text-[#86d9f9]"
                    >
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

        {/* Your Position Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 pt-8 border-t border-[#2e3354]/30 max-w-4xl mx-auto"
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
                      <span className="w-10 h-10 flex items-center justify-center rounded-lg
                        bg-[#1a1b32]/60 font-bold text-lg text-[#86d9f9]"
                      >
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

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-[#2e3354]/50'}`}
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
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium
                    ${currentPage === pageNumber 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'text-[#86d9f9] hover:bg-[#2e3354]/50'}`}
                >
                  {pageNumber}
                </motion.button>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-[#2e3354]/50'}`}
          >
            <ChevronRight className="w-6 h-6 text-[#86d9f9]" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
