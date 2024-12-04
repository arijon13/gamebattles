"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

// Utility function for countdown
const useCountdown = (targetDate: string) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft(); // Kjør umiddelbart
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

// Hjelpefunksjon for å formatere dato
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
};

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
      prize: "10",
      totalPlayers: "128",
      registeredPlayers: "98",
      date: "2024-12-15T12:00:00",
      registrationOpen: true
    },
    { 
      name: "CS:GO Major", 
      description: "Prove your skills in this major CS:GO event!", 
      image: "/images/games/csgo.png",
      prize: "25",
      totalPlayers: "64",
      registeredPlayers: "45",
      date: "2024-12-20T15:00:00",
      registrationOpen: true
    },
    { 
      name: "FIFA Ultimate", 
      description: "Join the best FIFA players in this showdown!", 
      image: "/images/games/fc.jpg",
      prize: "15",
      totalPlayers: "32",
      registeredPlayers: "28",
      date: "2024-12-25T18:00:00",
      registrationOpen: true
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
        <div className="flex justify-between items-center max-w-5xl mx-auto px-6 mb-8">
          <h2 className="text-2xl font-bold text-[#00e7ff]">Featured Tournaments</h2>
          <Link 
            href="/tournaments"
            className="text-[#86d9f9] hover:text-[#00e7ff] transition-colors flex items-center space-x-2"
          >
            <span>View All Tournaments</span>
            <span>→</span>
          </Link>
        </div>
        <div className="flex justify-center gap-6 px-6 max-w-5xl mx-auto">
          {tournaments.map((tournament, index) => {
            const timeLeft = useCountdown(tournament.date);
            const [prevTimeLeft, setPrevTimeLeft] = useState(timeLeft);

            // Oppdater prevTimeLeft når timeLeft endrer seg
            useEffect(() => {
              setPrevTimeLeft(timeLeft);
            }, [timeLeft]);

            // Array med tidsverdier for enklere sammenligning
            const timeValues = [
              { key: 'days', value: timeLeft.days, label: 'Days' },
              { key: 'hours', value: timeLeft.hours, label: 'Hours' },
              { key: 'minutes', value: timeLeft.minutes, label: 'Minutes' },
              { key: 'seconds', value: timeLeft.seconds, label: 'Seconds' }
            ] as const;

            const spotsLeft = parseInt(tournament.totalPlayers) - parseInt(tournament.registeredPlayers);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-1/3 rounded-xl overflow-hidden bg-gradient-to-br from-[#2e3354]/80 to-[#1a1b32]/80 
                  backdrop-blur-lg border border-[#2e3354]/30 
                  hover:shadow-[0_0_30px_rgba(0,231,255,0.2)] hover:-translate-y-2 
                  transition-all duration-300"
              >
                <div className="relative group">
                  <img 
                    src={tournament.image} 
                    alt={tournament.name} 
                    className="w-full h-48 object-cover transform transition-transform duration-500 
                      group-hover:scale-105"
                  />
                  {/* Smooth gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t 
                    from-[#1a1b32] via-[#1a1b32]/50 to-transparent 
                    opacity-60 transition-opacity duration-300
                    group-hover:opacity-40" 
                  />
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 
                    bg-gradient-to-t from-[#1a1b32] to-transparent">
                    <h3 className="text-xl font-bold text-[#86d9f9] mb-2 
                      group-hover:text-[#00e7ff] transition-colors duration-300">
                      {tournament.name}
                    </h3>
                    <p className="text-[#86d9f9]/80 text-sm">
                      {tournament.description}
                    </p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-[#86d9f9]">{tournament.name}</h3>
                  <p className="text-[#a5b3e5]">{tournament.description}</p>
                  
                  {/* Players Progress Bar - med forbedret styling */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#86d9f9] flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#00e7ff]" />
                        {tournament.registeredPlayers}/{tournament.totalPlayers} Players
                      </span>
                      <span className="text-[#86d9f9] flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#0077ff] animate-pulse" />
                        {spotsLeft} spots left
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#1a1b32] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00e7ff] to-[#0077ff] rounded-full 
                          transition-all duration-300 shadow-[0_0_10px_rgba(0,231,255,0.3)]"
                        style={{ 
                          width: `${(parseInt(tournament.registeredPlayers) / parseInt(tournament.totalPlayers)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  {/* Countdown timer med animasjon */}
                  <div className="grid grid-cols-4 gap-2 py-2">
                    {timeValues.map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="text-center"
                        animate={{ 
                          scale: item.value !== prevTimeLeft[item.key] ? [1.1, 1] : 1 
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-xl font-bold text-[#00e7ff] bg-[#1a1b32]/50 rounded-lg py-2 
                          shadow-[0_0_10px_rgba(0,231,255,0.1)] backdrop-blur-sm">
                          {item.value}
                        </div>
                        <div className="text-xs text-[#86d9f9]/70 mt-1">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="text-center">
                      <p className="text-sm text-[#86d9f9]/70">Prize Pool</p>
                      <p className="font-bold text-[#86d9f9]">
                        ${new Intl.NumberFormat().format(parseInt(tournament.prize))}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-[#86d9f9]/70">Players</p>
                      <p className="font-bold text-[#86d9f9]">{tournament.totalPlayers}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-[#86d9f9]/70">Date</p>
                      <p className="font-bold text-[#86d9f9]">
                        {formatDate(tournament.date)}
                      </p>
                    </div>
                  </div>
                  <button 
                    className="w-full py-3 rounded-lg font-bold text-[#1a1b32] 
                      bg-gradient-to-r from-[#00e7ff] to-[#0077ff]
                      hover:shadow-[0_0_20px_rgba(0,231,255,0.4)]
                      transform hover:scale-[1.02] active:scale-[0.98]
                      transition-all duration-300"
                  >
                    Register Now
                  </button>
                </div>
              </motion.div>
            );
          })}
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
            className="w-full p-4 pl-12 rounded-xl bg-[#2e3354]/80 text-white 
              placeholder-[#86d9f9]/70 focus:outline-none focus:ring-2 focus:ring-[#86d9f9]
              border border-[#86d9f9]/20 shadow-lg backdrop-blur-sm"
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
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00e7ff] to-[#0077ff] bg-clip-text text-transparent">
              Choose Your Battlefield
            </h2>
            <p className="text-[#86d9f9]/70">
              Select from our collection of competitive gaming titles
            </p>
          </div>
          
          <Link 
            href="/all-games"
            className="group flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-[#86d9f9] group-hover:text-[#00e7ff] transition-colors">
              View All Games
            </span>
            <span className="text-[#86d9f9] group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
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
