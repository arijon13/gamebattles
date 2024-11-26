"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrophyIcon,
  ChartBarIcon,
  WalletIcon,
  UserGroupIcon,
  ClockIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState({
    username: "Gamer123",
    rank: "Gold II",
    level: 42,
    xp: 8750,
    nextLevelXp: 10000,
    totalWagered: "$1,200",
    totalWins: 45,
    totalLosses: 22,
    winRate: "67%",
    profilePicture: "/images/default-profile.png",
    recentMatches: [
      { game: "FIFA", result: "Win", amount: "+$50", date: "2h ago" },
      { game: "CS:GO", result: "Loss", amount: "-$30", date: "5h ago" },
      { game: "Fortnite", result: "Win", amount: "+$25", date: "1d ago" },
    ],
    achievements: [
      { name: "First Blood", description: "Win your first match", icon: "🏆" },
      { name: "High Roller", description: "Wager over $1000", icon: "💰" },
      { name: "Unstoppable", description: "Win 5 matches in a row", icon: "🔥" },
    ],
  });

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setUser({ ...user, profilePicture: reader.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <main className="bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-b from-[#2e3354] to-[#1e233b] rounded-2xl shadow-2xl p-8 mb-8"
        >
          <div className="flex items-center gap-8">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-[#00e7ff] shadow-[0_0_20px_rgba(0,231,255,0.3)]"
              />
              <label
                htmlFor="profilePicture"
                className="absolute bottom-0 right-0 bg-[#00e7ff] p-2 rounded-full cursor-pointer 
                  hover:bg-[#00b9d6] transition-all shadow-lg"
                title="Change Profile Picture"
              >
                <svg className="w-5 h-5 text-[#1a1b32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input type="file" id="profilePicture" accept="image/*" onChange={handleProfilePictureChange} 
                  className="hidden" />
              </label>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-white">{user.username}</h1>
                <span className="px-3 py-1 bg-gradient-to-r from-[#00e7ff] to-[#0077ff] 
                  text-[#1a1b32] text-sm font-bold rounded-full">
                  {user.rank}
                </span>
              </div>
              
              {/* Level Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-[#86d9f9] mb-2">
                  <span>Level {user.level}</span>
                  <span>{user.xp}/{user.nextLevelXp} XP</span>
                </div>
                <div className="w-full h-2 bg-[#1a1b32] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00e7ff] to-[#0077ff]"
                    style={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#00e7ff]">{user.totalWins}</p>
                <p className="text-sm text-[#86d9f9]">Wins</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#00e7ff]">{user.winRate}</p>
                <p className="text-sm text-[#86d9f9]">Win Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#00e7ff]">{user.totalWagered}</p>
                <p className="text-sm text-[#86d9f9]">Wagered</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: ChartBarIcon },
            { id: 'matches', label: 'Match History', icon: ClockIcon },
            { id: 'achievements', label: 'Achievements', icon: TrophyIcon },
            { id: 'wallet', label: 'Wallet', icon: WalletIcon },
            { id: 'friends', label: 'Friends', icon: UserGroupIcon },
            { id: 'settings', label: 'Settings', icon: CogIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${activeTab === tab.id 
                  ? 'bg-[#2e3354] text-[#00e7ff]' 
                  : 'text-[#86d9f9] hover:bg-[#2e3354]/50'}`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 gap-8"
        >
          {/* Recent Matches */}
          <div className="bg-[#2e3354] rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Recent Matches</h2>
            <div className="space-y-4">
              {user.recentMatches.map((match, index) => (
                <div key={index} className="flex items-center justify-between bg-[#1a1b32] p-3 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{match.game}</p>
                    <p className="text-sm text-[#86d9f9]">{match.date}</p>
                  </div>
                  <div className={`text-right ${
                    match.result === 'Win' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <p className="font-medium">{match.result}</p>
                    <p className="text-sm">{match.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-[#2e3354] rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Achievements</h2>
            <div className="space-y-4">
              {user.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4 bg-[#1a1b32] p-3 rounded-lg">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p className="font-medium text-white">{achievement.name}</p>
                    <p className="text-sm text-[#86d9f9]">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-[#2e3354] rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1b32] p-4 rounded-lg">
                <p className="text-[#86d9f9] text-sm">Total Matches</p>
                <p className="text-2xl font-bold text-white">{user.totalWins + user.totalLosses}</p>
              </div>
              <div className="bg-[#1a1b32] p-4 rounded-lg">
                <p className="text-[#86d9f9] text-sm">Win Streak</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <div className="bg-[#1a1b32] p-4 rounded-lg">
                <p className="text-[#86d9f9] text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-green-400">+$450</p>
              </div>
              <div className="bg-[#1a1b32] p-4 rounded-lg">
                <p className="text-[#86d9f9] text-sm">Favorite Game</p>
                <p className="text-2xl font-bold text-white">FIFA</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
