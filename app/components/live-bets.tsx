"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from 'next/link';
import { UserCircleIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

// Mock data for live bets
const liveBetsData = [
  {
    id: 1,
    player1: "Alex",
    player2: "Jordan",
    amount: 250,
    odds: "1.5x",
    timeLeft: "5:30",
  },
  {
    id: 2,
    player1: "Sarah",
    player2: "Mike",
    amount: 500,
    odds: "2.0x",
    timeLeft: "3:45",
  },
];

const highRollersData = [
  {
    id: 1,
    player1: "BigSpender123",
    player2: "WhaleGamer",
    amount: 1000,
    game: "CS2",
    timestamp: "2 min ago",
  },
  {
    id: 2,
    player1: "ProGamer",
    player2: "HighStakes",
    amount: 750,
    game: "Valorant",
    timestamp: "5 min ago",
  },
];

export default function LiveBets() {
  type SectionType = "mybets" | "livebets" | "highrollers";
  const [activeSection, setActiveSection] = useState<SectionType>("mybets");

  const buttonVariants = {
    inactive: { scale: 1 },
    active: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const sections: Record<SectionType, JSX.Element> = {
    mybets: (
      <motion.div 
        className="glass-card p-6 rounded-xl"
        variants={contentVariants}
      >
        <div className="text-center space-y-4">
          <span className="text-[#86d9f9] text-lg">No active bets</span>
          <p className="text-[#c3c8f3]/70">Place your first bet to get started!</p>
          <Link 
            href="/all-games"
            className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium 
              hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(0,231,255,0.3)]
              hover:shadow-[0_0_25px_rgba(0,231,255,0.4)] transform hover:scale-105"
          >
            Place Bet
          </Link>
        </div>
      </motion.div>
    ),
    livebets: (
      <motion.div 
        className="glass-card p-6 rounded-xl space-y-4"
        variants={contentVariants}
      >
        {liveBetsData.map((bet) => (
          <motion.div 
            key={bet.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1a1b32]/60 p-4 rounded-lg border border-[#86d9f9]/20 hover:border-[#86d9f9]/40 transition-all"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="w-6 h-6 text-[#86d9f9]" />
                  <span className="text-white">{bet.player1}</span>
                </div>
                <span className="text-[#86d9f9]">vs</span>
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="w-6 h-6 text-[#86d9f9]" />
                  <span className="text-white">{bet.player2}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-[#86d9f9]">{bet.odds}</span>
                <span className="text-green-400 font-medium">{formatMoney(bet.amount)}</span>
                <span className="text-[#c3c8f3]/70 text-sm">{bet.timeLeft}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    ),
    highrollers: (
      <motion.div 
        className="glass-card p-6 rounded-xl space-y-4"
        variants={contentVariants}
      >
        {highRollersData.map((bet) => (
          <motion.div 
            key={bet.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1a1b32]/60 p-4 rounded-lg border border-[#86d9f9]/20 hover:border-[#86d9f9]/40 transition-all"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="w-6 h-6 text-[#86d9f9]" />
                  <span className="text-white">{bet.player1}</span>
                </div>
                <span className="text-[#86d9f9]">vs</span>
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="w-6 h-6 text-[#86d9f9]" />
                  <span className="text-white">{bet.player2}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-medium">{formatMoney(bet.amount)}</span>
                  <span className="text-[#86d9f9] text-sm">{bet.game}</span>
                </div>
                <p className="text-sm text-[#c3c8f3]/70">{bet.timestamp}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    ),
  };

  return (
    <div className="space-y-8">
      <motion.h3 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold bg-gradient-to-r from-[#00e7ff] to-[#0077ff] bg-clip-text text-transparent text-center"
      >
        Live Bets
      </motion.h3>

      <div className="flex justify-center space-x-4">
        {["mybets", "livebets", "highrollers"].map((section) => (
          <motion.button
            key={section}
            variants={buttonVariants}
            animate={activeSection === section ? "active" : "inactive"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection(section as SectionType)}
            className={`
              px-6 py-3 rounded-lg font-medium transition-all duration-300
              ${activeSection === section
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                : "bg-[#292d3e]/80 text-cyan-400 hover:bg-[#2e3354]"
              }
            `}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={contentVariants}
        >
          {sections[activeSection]}
        </motion.div>
      </AnimatePresence>

      <style jsx>{`
        .glass-card {
          background: rgba(26, 27, 50, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
      `}</style>
    </div>
  );
}
