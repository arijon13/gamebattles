"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  WalletIcon,
  UserGroupIcon,
  ClockIcon,
  CogIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function Profile() {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: undefined,
    winRate: "75%",
    gamesPlayed: "1,234",
    lastActive: "2 days ago",
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#2e3354] rounded-2xl shadow-2xl p-8 border border-[#86d9f9]/20"
        >
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <UserCircleIcon className="w-24 h-24 text-[#86d9f9]" />
              )}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#2e3354]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">{user.name}</h2>
              <p className="text-[#86d9f9]/70">{user.email}</p>
              <p className="text-sm text-[#86d9f9]/50">Last active: {user.lastActive}</p>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-[#1a1b32]/80 rounded-xl shadow-lg">
              <ChartBarIcon className="w-6 h-6 text-[#86d9f9] mb-2" />
              <p className="text-sm text-[#86d9f9]/70">Win Rate</p>
              <p className="text-xl font-bold text-white">{user.winRate}</p>
            </div>
            <div className="p-4 bg-[#1a1b32]/80 rounded-xl shadow-lg">
              <UserGroupIcon className="w-6 h-6 text-[#86d9f9] mb-2" />
              <p className="text-sm text-[#86d9f9]/70">Games Played</p>
              <p className="text-xl font-bold text-white">{user.gamesPlayed}</p>
            </div>
            <div className="p-4 bg-[#1a1b32]/80 rounded-xl shadow-lg">
              <ClockIcon className="w-6 h-6 text-[#86d9f9] mb-2" />
              <p className="text-sm text-[#86d9f9]/70">Last Active</p>
              <p className="text-xl font-bold text-white">{user.lastActive}</p>
            </div>
          </div>

          {/* Profile Settings */}
          <div className="p-4 bg-[#1a1b32]/80 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Settings</h3>
              <CogIcon className="w-6 h-6 text-[#86d9f9]" />
            </div>
            <div className="mt-4 space-y-4">
              <button className="w-full px-4 py-2 rounded-lg bg-[#00e7ff]/90 hover:bg-[#00e7ff] text-[#1a1b32] font-bold text-sm transition-colors duration-300 shadow-[0_0_20px_rgba(0,231,255,0.3)]">
                Edit Profile
              </button>
              <button className="w-full px-4 py-2 rounded-lg bg-red-500/90 hover:bg-red-500 text-white font-bold text-sm transition-colors duration-300 shadow-[0_0_20px_rgba(255,0,0,0.3)]">
                Log Out
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
