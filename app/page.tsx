"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const games = [
    { name: "FIFA", image: "/images/games/fc.jpg", path: "/games/fifa" },
    { name: "CS:GO", image: "/images/games/csgo.png", path: "/games/csgo" },
    { name: "Fortnite", image: "/images/games/fortnite.jpg", path: "/games/fortnite" },
    { name: "Call of Duty", image: "/images/games/cod.png", path: "/games/cod" },
    { name: "League of Legends", image: "/images/games/league-of-legends.png", path: "/games/lol" },
    { name: "Apex Legends", image: "/images/games/apex-legends.png", path: "/games/apexlegends" },
    { name: "Rocket League", image: "/images/games/rocket-league.png", path: "/games/rocketleague" },
  ];

  const tournaments = [
    { 
      name: "Fortnite Showdown", 
      description: "Compete in the ultimate Fortnite tournament!", 
      image: "/images/games/fortnite.jpg",
      prize: "10,000",
      players: "128",
      date: "March 15, 2024"
    },
    { 
      name: "CS:GO Major", 
      description: "Prove your skills in this major CS:GO event!", 
      image: "/images/games/csgo.png",
      prize: "25,000",
      players: "64",
      date: "March 20, 2024"
    },
    { 
      name: "FIFA Ultimate", 
      description: "Join the best FIFA players in this showdown!", 
      image: "/images/games/fc.jpg",
      prize: "15,000",
      players: "32",
      date: "March 25, 2024"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const gamesToShow = 6;

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredGames.length - gamesToShow : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === filteredGames.length - gamesToShow ? 0 : prevIndex + 1));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] text-white py-10">
      {/* Hero Section - Removed */}
      {/* Featured Tournaments Section now starts at the top */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-20 pt-10"
      >
        <h2 className="text-2xl font-bold text-[#00e7ff] mb-8 px-6 max-w-5xl mx-auto">
          Featured Tournaments
        </h2>
        <div className="flex justify-center gap-6 px-6 max-w-5xl mx-auto">
          {tournaments.map((tournament, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-1/3 rounded-xl overflow-hidden bg-gradient-to-br from-[#2e3354]/80 to-[#1a1b32]/80 
                backdrop-blur-lg border border-[#2e3354]/30 shadow-xl hover:shadow-2xl 
                transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <img 
                  src={tournament.image} 
                  alt={tournament.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b32] to-transparent" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-[#86d9f9]">{tournament.name}</h3>
                <p className="text-[#a5b3e5]">{tournament.description}</p>
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="text-center">
                    <p className="text-sm text-[#86d9f9]/70">Prize Pool</p>
                    <p className="font-bold text-[#86d9f9]">${tournament.prize}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-[#86d9f9]/70">Players</p>
                    <p className="font-bold text-[#86d9f9]">{tournament.players}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-[#86d9f9]/70">Date</p>
                    <p className="font-bold text-[#86d9f9]">{tournament.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-5xl mx-auto px-6 mb-12"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search your game"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 rounded-xl bg-[#2e3354]/50 text-white 
              placeholder-[#6672a1] focus:outline-none focus:ring-2 focus:ring-[#86d9f9]
              border border-[#2e3354]/30 shadow-lg backdrop-blur-sm"
          />
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#86d9f9]"
          >
            <path 
              fill="currentColor" 
              d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7z"
            />
          </svg>
        </div>
      </motion.div>

      {/* Games Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative max-w-6xl mx-auto px-6"
      >
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/all-games"
            className="group flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <h2 className="text-2xl font-bold text-[#00e7ff]">Available Games</h2>
            <span className="text-[#86d9f9] group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
          
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="p-2 rounded-lg border border-[#86d9f9]/30 hover:bg-[#2e3354]/50 
                transition-colors duration-300"
            >
              <svg className="w-6 h-6 text-[#86d9f9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="p-2 rounded-lg border border-[#86d9f9]/30 hover:bg-[#2e3354]/50 
                transition-colors duration-300"
            >
              <svg className="w-6 h-6 text-[#86d9f9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        <div className="relative overflow-hidden py-8">
          <div className="flex space-x-6 transition-transform duration-300 ease-out"
               style={{ transform: `translateX(-${currentIndex * (100 / gamesToShow)}%)` }}>
            {filteredGames.map((game, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 group"
                style={{ width: `calc((100% - ${(gamesToShow - 1) * 1.5}rem) / ${gamesToShow})` }}
              >
                <Link
                  href={game.path}
                  className="block relative rounded-xl overflow-hidden group-hover:-translate-y-4 
                    transition-all duration-300"
                >
                  {/* Card Container */}
                  <div className="relative w-full aspect-[2/3] bg-[#1a1b32] 
                    border border-[#86d9f9]/20 shadow-lg group-hover:shadow-[0_0_20px_rgba(134,217,249,0.2)]
                    rounded-xl overflow-hidden">
                    
                    {/* Game Image */}
                    <img 
                      src={game.image} 
                      alt={game.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 
                        group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b32] via-transparent to-transparent 
                      opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Game Info */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#1a1b32] to-transparent">
                      <h3 className="text-lg font-bold text-center text-[#86d9f9] mb-3
                        group-hover:text-white transition-colors duration-300">
                        {game.name}
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-2 rounded-lg bg-[#00e7ff]/90 hover:bg-[#00e7ff] 
                          text-[#1a1b32] font-bold text-sm transition-colors duration-300
                          shadow-[0_0_20px_rgba(0,231,255,0.3)]"
                      >
                        Play Now
                      </motion.button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
}
