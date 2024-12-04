"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import LiveBets from "./live-bets";
import Leaderboard from "./leaderboard";
import Information from "./information";

export default function Footer() {
  const pathname = usePathname();
  
  // Paths where LiveBets and Leaderboard should be hidden
  const hideSectionsOn = ["/leaderboard", "/live-bets", "/support", "/contact", "/faq", "/help", "/terms", "/privacy"];

  // Check if we should hide LiveBets and Leaderboard
  const shouldHideSections = hideSectionsOn.some(path => pathname.startsWith(path));

  return (
    <footer className="bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] text-[#c3c8f3] py-16">
      <motion.div 
        className="flex flex-col space-y-12 px-8 mx-auto w-full max-w-6xl"
      >
        {!shouldHideSections && (
          <>
            <motion.div className="glass-morphism rounded-2xl shadow-2xl p-8">
              <LiveBets />
            </motion.div>
            <motion.div className="glass-morphism rounded-2xl shadow-2xl p-8">
              <Leaderboard />
            </motion.div>
          </>
        )}
        
        {/* Information is always visible */}
        <motion.div className="glass-morphism rounded-2xl shadow-2xl p-8">
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
