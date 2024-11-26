"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import LiveBets from "./live-bets";
import Leaderboard from "./leaderboard";
import Information from "./information";

export default function Footer() {
  const pathname = usePathname();
  const excludeSectionsOn = ["/leaderboard", "/live-bets"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] text-[#c3c8f3] py-16">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col space-y-12 px-8 mx-auto w-full max-w-6xl"
      >
        {!excludeSectionsOn.includes(pathname) && (
          <motion.div variants={itemVariants} className="glass-morphism rounded-2xl shadow-2xl p-8">
            <LiveBets />
          </motion.div>
        )}

        {!excludeSectionsOn.includes(pathname) && (
          <motion.div variants={itemVariants} className="glass-morphism rounded-2xl shadow-2xl p-8">
            <Leaderboard />
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="glass-morphism rounded-2xl shadow-2xl p-8">
          <Information />
        </motion.div>
      </motion.div>

      <style jsx>{`
        .glass-morphism {
          background: rgba(30, 35, 59, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
      `}</style>
    </footer>
  );
}
