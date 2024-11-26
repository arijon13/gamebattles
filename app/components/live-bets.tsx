"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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

  const sections: Record<SectionType, JSX.Element> = {
    mybets: (
      <motion.div 
        className="glass-card p-6 rounded-xl"
        variants={contentVariants}
      >
        <div className="text-center space-y-4">
          <span className="text-[#86d9f9] text-lg">No active bets</span>
          <p className="text-[#c3c8f3]/70">Place your first bet to get started!</p>
          <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
            Place Bet
          </button>
        </div>
      </motion.div>
    ),
    livebets: (
      <motion.div 
        className="glass-card p-6 rounded-xl"
        variants={contentVariants}
      >
        <div className="text-center space-y-4">
          <span className="text-[#86d9f9] text-lg">Live bets</span>
          <p className="text-[#c3c8f3]/70">Here are the live bets!</p>
        </div>
      </motion.div>
    ),
    highrollers: (
      <motion.div 
        className="glass-card p-6 rounded-xl"
        variants={contentVariants}
      >
        <div className="text-center space-y-4">
          <span className="text-[#86d9f9] text-lg">Top Bet</span>
          <p className="text-[#c3c8f3]/70">50 BTC</p>
          <p className="text-[#c3c8f3]/70">Player: BigSpender123</p>
        </div>
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
