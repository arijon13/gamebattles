"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { UserCircleIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function FindPlayers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [players] = useState([
    { name: "Player1", region: "EU", rank: "Elite", winRate: "78%", gamesPlayed: "1,234" },
    { name: "Player2", region: "NAE", rank: "Pro", winRate: "72%", gamesPlayed: "956" },
    { name: "Player3", region: "NAW", rank: "Elite", winRate: "81%", gamesPlayed: "2,145" },
    { name: "Player4", region: "EU", rank: "Pro", winRate: "75%", gamesPlayed: "1,567" },
    { name: "Player5", region: "ASIA", rank: "Active", winRate: "69%", gamesPlayed: "789" },
  ]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] p-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00e7ff] to-[#0077ff] bg-clip-text text-transparent">
          Find Players
        </h1>
        <p className="text-[#86d9f9]/70 mt-4">
          Connect with players and build your team
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative max-w-2xl mx-auto mb-12"
      >
        <input
          type="text"
          placeholder="Search for players..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-4 pl-12 rounded-xl bg-[#1a1b32]/80 text-white placeholder-[#86d9f9]/50 
            border border-[#86d9f9]/20 focus:border-[#86d9f9]/50 focus:outline-none focus:ring-2 
            focus:ring-[#86d9f9]/20 shadow-lg backdrop-blur-sm transition-all duration-300"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#86d9f9]/70"
        >
          <path
            fill="currentColor"
            d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7z"
          />
        </svg>
      </motion.div>

      {/* Player List */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto space-y-4"
      >
        {filteredPlayers.map((player, index) => (
          <motion.div
            key={player.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="relative p-6 bg-[#1a1b32]/80 rounded-xl border border-[#86d9f9]/20 
              shadow-lg backdrop-blur-sm hover:shadow-[0_0_20px_rgba(134,217,249,0.2)]
              hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between">
                {/* Player Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <UserCircleIcon className="w-12 h-12 text-[#86d9f9]" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full 
                      border-2 border-[#1a1b32]" /> {/* Online indicator */}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#86d9f9] 
                      transition-colors duration-300">
                      {player.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-[#86d9f9]/70">
                      <GlobeAltIcon className="w-4 h-4" />
                      <span>{player.region}</span>
                      <span>•</span>
                      <span className={`
                        ${player.rank === 'Elite' ? 'text-yellow-400' : 
                          player.rank === 'Pro' ? 'text-purple-400' : 'text-blue-400'}
                      `}>
                        {player.rank}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats & Action */}
                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <p className="text-sm text-[#86d9f9]/70">Win Rate</p>
                    <p className="font-semibold text-[#86d9f9]">{player.winRate}</p>
                  </div>
                  <div className="text-right mr-8">
                    <p className="text-sm text-[#86d9f9]/70">Games</p>
                    <p className="font-semibold text-[#86d9f9]">{player.gamesPlayed}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-lg bg-[#00e7ff]/90 hover:bg-[#00e7ff] 
                      text-[#1a1b32] font-bold text-sm transition-colors duration-300
                      shadow-[0_0_20px_rgba(0,231,255,0.3)]"
                  >
                    Add Friend
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
