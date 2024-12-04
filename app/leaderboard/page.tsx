"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, ChevronLeft, ChevronRight } from "lucide-react";

interface Player {
  rank: number;
  name: string;
  wagered: number;
  winRate: string;
  earnings: string;
  lastActive: string;
  level: number;
  avatar?: string;
}

const convertToDollar = (coins: number, conversionRate: number) => {
  return (coins * conversionRate).toFixed(2);
};

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

const ProgressBar = ({ value }: { value: number }) => (
  <div>
    <div className="w-full bg-[#1a1b32]/40 rounded-full h-2">
      <div 
        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
    <p className="text-[#86d9f9] text-sm mt-1">{value}%</p>
  </div>
);

export default function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;
  const totalPages = 10;

  const emptyPlayers: Player[] = Array.from({ length: 100 }, (_, index) => ({
    rank: index + 1,
    name: "Waiting for players...",
    wagered: 0,
    winRate: "0",
    earnings: "$0.00",
    lastActive: '-',
    level: 0,
    avatar: undefined,
  }));

  const [players] = useState<Player[]>(emptyPlayers);
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const top3Players = players.slice(0, 3);

  const conversionRate = 0.1;

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

        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {top3Players.map((player) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                relative p-6 rounded-xl shadow-xl
                ${player.rank === 1 
                  ? 'w-80 scale-110 z-10 bg-gradient-to-br from-[#2e3354] to-[#1a1b32] border-2 border-yellow-400/30' 
                  : 'w-72 bg-gradient-to-r from-[#1a1b32]/90 to-[#2e3354]/90'}
                border border-[#2e3354]/30
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
                    <ProgressBar value={parseInt(player.winRate)} />
                  </div>
                  <div className="text-center p-3 rounded-lg bg-[#1a1b32]/40">
                    <p className="text-sm text-[#86d9f9]/70">Wagered</p>
                    <p className="font-mono font-semibold text-[#86d9f9]">
                      ${convertToDollar(player.wagered, conversionRate)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4 max-w-4xl mx-auto bg-[#1a1b32]/20 p-6 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4 border-b border-[#2e3354]/30 pb-4">
            <h3 className="text-xl font-bold text-[#86d9f9]">Rankings</h3>
          </div>
          {currentPlayers.slice(3).map((player) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl glass-morphism hover:scale-[1.02] transition-all duration-300
                bg-gradient-to-r from-[#1a1b32]/40 to-[#2e3354]/40
                border border-[#2e3354]/30 backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-10 h-10 flex items-center justify-center rounded-lg
                      bg-[#1a1b32]/60 font-bold text-lg text-[#86d9f9]"
                    >
                      {player.rank}
                    </span>
                    <span className="font-semibold text-white opacity-50">{player.name}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm text-[#86d9f9]/70">Win Rate</p>
                    <ProgressBar value={parseInt(player.winRate)} />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#86d9f9]/70">Wagered</p>
                    <p className="font-mono font-semibold text-[#86d9f9] opacity-50">
                      ${convertToDollar(player.wagered, conversionRate)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="flex justify-center items-center space-x-4 mt-8">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 pt-8 border-t border-[#2e3354]/30 max-w-4xl mx-auto"
        >
          <h4 className="text-xl font-bold text-[#86d9f9] mb-4">Your Position</h4>
          <div className="space-y-2">
            <motion.div
              className="p-4 rounded-xl bg-[#1a1b32]/40 transition-all duration-300 border border-[#2e3354]/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-10 h-10 flex items-center justify-center rounded-lg
                      bg-[#1a1b32]/60 font-bold text-lg text-[#86d9f9]"
                    >
                      0
                    </span>
                    <span className="font-semibold text-white opacity-50">Your Name</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm text-[#86d9f9]/70">Win Rate</p>
                    <ProgressBar value={0} />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#86d9f9]/70">Wagered</p>
                    <p className="font-mono font-semibold text-[#86d9f9] opacity-50">
                      $0.00
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
