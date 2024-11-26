"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const allPlayers = Array.from({ length: 100 }, (_, i) => ({
  rank: i + 1,
  name: `Player${i + 1}`,
  wagered: `${(5000 - i * 50).toFixed(2)}`,
  winRate: `${Math.floor(80 - i/2)}%`,
  status: i < 3 ? "Elite" : i < 10 ? "Pro" : "Active"
}));

export default function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;
  const currentPlayerRank = 55;

  // Pagination logic
  const totalPages = Math.ceil((allPlayers.length - 3) / playersPerPage); // -3 because top 3 are in podium
  const startIndex = 3 + (currentPage - 1) * playersPerPage;
  const endIndex = startIndex + playersPerPage;

  // Calculate nearby players
  const nearbyPlayers = allPlayers.filter(player => 
    Math.abs(player.rank - currentPlayerRank) <= 2
  );

  // Podium animation variants
  const podiumVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] p-8">
      {/* Header */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#00e7ff] to-[#0077ff] bg-clip-text text-transparent"
      >
        Global Rankings
      </motion.h1>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end space-x-8 mb-20 h-[400px]">
        {/* Second Place */}
        <motion.div
          custom={1}
          variants={podiumVariants}
          initial="hidden"
          animate="visible"
          className="w-64 text-center"
        >
          <div className="relative mb-4">
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-[#C0C0C0] overflow-hidden bg-[#1a1b32] flex items-center justify-center">
              <UserCircleIcon className="w-24 h-24 text-[#86d9f9]/70" />
            </div>
            <div className="absolute -bottom-4 right-1/3 bg-[#C0C0C0] rounded-full p-2">
              <span className="text-2xl">🥈</span>
            </div>
          </div>
          <div className="bg-gradient-to-b from-[#2e3354] to-[#1a1b32] p-6 rounded-xl h-[200px]">
            <h3 className="text-xl font-bold text-[#C0C0C0] mb-2">{allPlayers[1].name}</h3>
            <p className="text-[#86d9f9]">{allPlayers[1].wagered} BTC</p>
            <p className="text-[#86d9f9]/70">Win Rate: {allPlayers[1].winRate}</p>
          </div>
        </motion.div>

        {/* First Place */}
        <motion.div
          custom={0}
          variants={podiumVariants}
          initial="hidden"
          animate="visible"
          className="w-72 text-center -mt-20"
        >
          <div className="relative mb-4">
            <div className="w-40 h-40 mx-auto rounded-full border-4 border-[#FFD700] overflow-hidden bg-[#1a1b32] shadow-lg shadow-yellow-500/50 flex items-center justify-center">
              <UserCircleIcon className="w-32 h-32 text-[#86d9f9]/70" />
            </div>
            <div className="absolute -bottom-4 right-1/3 bg-[#FFD700] rounded-full p-2">
              <span className="text-2xl">👑</span>
            </div>
          </div>
          <div className="bg-gradient-to-b from-[#2e3354] to-[#1a1b32] p-6 rounded-xl h-[240px]">
            <h3 className="text-2xl font-bold text-[#FFD700] mb-2">{allPlayers[0].name}</h3>
            <p className="text-[#86d9f9] text-lg">{allPlayers[0].wagered} BTC</p>
            <p className="text-[#86d9f9]/70">Win Rate: {allPlayers[0].winRate}</p>
          </div>
        </motion.div>

        {/* Third Place */}
        <motion.div
          custom={2}
          variants={podiumVariants}
          initial="hidden"
          animate="visible"
          className="w-64 text-center"
        >
          <div className="relative mb-4">
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-[#CD7F32] overflow-hidden bg-[#1a1b32] flex items-center justify-center">
              <UserCircleIcon className="w-24 h-24 text-[#86d9f9]/70" />
            </div>
            <div className="absolute -bottom-4 right-1/3 bg-[#CD7F32] rounded-full p-2">
              <span className="text-2xl">🥉</span>
            </div>
          </div>
          <div className="bg-gradient-to-b from-[#2e3354] to-[#1a1b32] p-6 rounded-xl h-[200px]">
            <h3 className="text-xl font-bold text-[#CD7F32] mb-2">{allPlayers[2].name}</h3>
            <p className="text-[#86d9f9]">{allPlayers[2].wagered} BTC</p>
            <p className="text-[#86d9f9]/70">Win Rate: {allPlayers[2].winRate}</p>
          </div>
        </motion.div>
      </div>

      {/* Leaderboard Table */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-5xl mx-auto bg-[#1a1b32]/50 rounded-2xl backdrop-blur-lg border border-[#2e3354]/30"
      >
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-[#2e3354] to-[#1e233b]">
              <th className="px-6 py-4 text-[#86d9f9] font-semibold">Rank</th>
              <th className="px-6 py-4 text-[#86d9f9] font-semibold">Player</th>
              <th className="px-6 py-4 text-[#86d9f9] font-semibold">Win Rate</th>
              <th className="px-6 py-4 text-[#86d9f9] font-semibold">Wagered</th>
              <th className="px-6 py-4 text-[#86d9f9] font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {allPlayers.slice(startIndex, endIndex).map((player, index) => (
              <motion.tr
                key={player.rank}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  ${index % 2 === 0 ? "bg-[#1a1b32]/60" : "bg-[#292d3e]/60"}
                  hover:bg-[#2e3354]/80 transition-all duration-300
                  ${player.rank === currentPlayerRank ? "bg-blue-500/20 border-l-4 border-blue-500" : ""}
                `}
              >
                <td className="px-6 py-4 text-center font-semibold text-[#86d9f9]">{player.rank}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a1b32] border border-[#2e3354]/50 overflow-hidden flex items-center justify-center">
                      <UserCircleIcon className="w-7 h-7 text-[#86d9f9]/70" />
                    </div>
                    <span className="font-medium text-white">{player.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-[#86d9f9]">{player.winRate}</td>
                <td className="px-6 py-4 text-center font-mono text-[#86d9f9]">{player.wagered} BTC</td>
                <td className="px-6 py-4 text-center">
                  <span className={`
                    px-2 py-1 rounded-full text-xs
                    ${player.status === "Elite" ? "bg-yellow-400/20 text-yellow-400" :
                      player.status === "Pro" ? "bg-blue-400/20 text-blue-400" :
                      "bg-green-400/20 text-green-400"}
                  `}>
                    {player.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 p-4 border-t border-[#2e3354]/30">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${
              currentPage === 1 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-[#2e3354]/50'
            }`}
          >
            <ChevronLeftIcon className="w-6 h-6 text-[#86d9f9]" />
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
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${
              currentPage === totalPages 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-[#2e3354]/50'
            }`}
          >
            <ChevronRightIcon className="w-6 h-6 text-[#86d9f9]" />
          </motion.button>
        </div>

        {/* Your Position Section */}
        <div className="border-t border-[#2e3354]/30 p-6">
          <h4 className="text-xl font-bold text-[#86d9f9] mb-4">Your Position</h4>
          <div className="space-y-2">
            {nearbyPlayers.map((player) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`
                  p-4 rounded-xl 
                  ${player.rank === currentPlayerRank 
                    ? 'bg-blue-500/20 border-l-4 border-blue-500' 
                    : 'bg-[#1a1b32]/40'}
                  transition-all duration-300
                  border border-[#2e3354]/30
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a1b32] border border-[#2e3354]/50 overflow-hidden flex items-center justify-center">
                      <UserCircleIcon className="w-7 h-7 text-[#86d9f9]/70" />
                    </div>
                    <span className="font-medium text-white">{player.name}</span>
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
        </div>
      </motion.div>
    </div>
  );
}
