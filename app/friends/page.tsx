"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamPopup from "./team-popup";
import { friendsData } from "./friendsdata";
import { UserCircleIcon, UserPlusIcon } from "@heroicons/react/24/outline";

export default function FriendsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriends = friendsData.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineFriends = filteredFriends.filter((friend) => friend.status === "online");
  const offlineFriends = filteredFriends.filter((friend) => friend.status === "offline");

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00e7ff] to-[#0077ff] bg-clip-text text-transparent">
            Friends
          </h1>
          <p className="text-[#86d9f9]/70 text-lg">
            Manage your friends and teams
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-2xl mx-auto"
        >
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 rounded-xl bg-[#1a1b32]/80 text-white 
              placeholder-[#86d9f9]/50 border border-[#86d9f9]/20 
              focus:border-[#86d9f9]/50 focus:outline-none focus:ring-2 
              focus:ring-[#86d9f9]/20 shadow-lg backdrop-blur-sm transition-all duration-300"
          />
          <UserPlusIcon className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-[#86d9f9]/70" />
        </motion.div>

        {friendsData.length === 0 ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[#86d9f9]/70 text-lg"
          >
            You don't have any friends yet.
          </motion.p>
        ) : (
          <div className="space-y-8">
            {/* Online Friends */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-[#86d9f9]">Online</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {onlineFriends.map((friend, index) => (
                  <motion.div
                    key={friend.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative p-4 bg-[#1a1b32]/80 rounded-xl 
                      border border-[#86d9f9]/20 shadow-lg backdrop-blur-sm 
                      hover:shadow-[0_0_20px_rgba(134,217,249,0.2)]
                      hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Friend card content */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        {friend.icon ? (
                          <img
                            src={friend.icon}
                            alt={friend.name}
                            className="w-12 h-12 rounded-full"
                          />
                        ) : (
                          <UserCircleIcon className="w-12 h-12 text-[#86d9f9]" />
                        )}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1b32]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-[#86d9f9] transition-colors duration-300">
                          {friend.name}
                        </h3>
                        <p className="text-sm text-green-400">Online</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Offline Friends Section - Similar structure to Online Friends */}
            {/* ... */}

            {/* Teams Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-8 border-t border-[#86d9f9]/20"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#86d9f9]">Teams</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-2 rounded-lg bg-[#00e7ff]/90 hover:bg-[#00e7ff] 
                    text-[#1a1b32] font-bold text-sm transition-colors duration-300
                    shadow-[0_0_20px_rgba(0,231,255,0.3)]"
                >
                  Create Team
                </motion.button>
              </div>
            </motion.section>
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <TeamPopup
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              friendsData={friendsData}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
