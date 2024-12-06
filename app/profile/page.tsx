"use client";

import { useState } from "react";
import {
  UserCircleIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  TrophyIcon,
  CircleStackIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    winRate: "75%",
    gamesPlayed: "1,234",
    lastActive: "2 days ago",
    totalWagered: "$10,234.50",
    rank: "#123",
    matches: [
      { id: 1, game: "Fortnite", type: "1v1", result: "Win", amount: "$20", date: "2024-01-24" },
      { id: 2, game: "Fortnite", type: "2v2", result: "Loss", amount: "$10", date: "2024-01-23" },
    ],
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <p className="text-[#86d9f9]/70">Manage your GameBattles profile and settings</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 bg-[#1E1F3B]/50 p-2 rounded-xl">
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
            icon={<ChartBarIcon className="w-5 h-5" />}
            label="Overview"
          />
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'security' 
                ? 'bg-[#86d9f9] text-[#1a1b32]' 
                : 'bg-[#2e3354] text-[#86d9f9] hover:bg-[#86d9f9]/10'
            }`}
          >
            <ShieldCheckIcon className="w-5 h-5 mr-2" />
            Security
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'payments' 
                ? 'bg-[#86d9f9] text-[#1a1b32]' 
                : 'bg-[#2e3354] text-[#86d9f9] hover:bg-[#86d9f9]/10'
            }`}
          >
            <CurrencyDollarIcon className="w-5 h-5 mr-2" />
            Payments
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'support' 
                ? 'bg-[#86d9f9] text-[#1a1b32]' 
                : 'bg-[#2e3354] text-[#86d9f9] hover:bg-[#86d9f9]/10'
            }`}
          >
            <QuestionMarkCircleIcon className="w-5 h-5 mr-2" />
            Support
          </button>
        </div>

        <div className="bg-[#1E1F3B] rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#86d9f9]/20 to-[#86d9f9]/5 flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserCircleIcon className="w-12 h-12 text-[#86d9f9]" />
                  )}
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-white text-sm">Change</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1E1F3B]" />
              </div>
              <p className="text-[#86d9f9]/70 text-xs mt-2">Click to change photo</p>
            </div>
            <div className="pt-2">
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-[#86d9f9]">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            label="Win Rate" 
            value={user.winRate}
            icon={<TrophyIcon className="w-5 h-5" />}
            gradient="from-green-500/20 to-green-500/5"
          />
          <StatCard 
            label="Games" 
            value={user.gamesPlayed} 
            icon={<CircleStackIcon className="w-5 h-5" />} 
            gradient="from-blue-500/20 to-blue-500/5" 
          />
          <StatCard 
            label="Wagered" 
            value={user.totalWagered} 
            icon={<CurrencyDollarIcon className="w-5 h-5" />} 
            gradient="from-yellow-500/20 to-yellow-500/5" 
          />
          <StatCard 
            label="Rank" 
            value={user.rank} 
            icon={<HashtagIcon className="w-5 h-5" />} 
            gradient="from-purple-500/20 to-purple-500/5" 
          />
        </div>

        <div className="bg-[#1E1F3B] rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Recent Matches</h3>
          <div className="space-y-3">
            {user.matches.map(match => (
              <div key={match.id} 
                className="flex items-center justify-between p-4 bg-[#86d9f9]/5 rounded-xl hover:bg-[#86d9f9]/10 hover:shadow-lg hover:shadow-[#86d9f9]/5 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#86d9f9]/20 to-[#86d9f9]/5 flex items-center justify-center">
                    <span className="text-[#86d9f9] text-lg font-medium">FN</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{match.game} {match.type}</p>
                    <p className="text-[#86d9f9]/70 text-sm">{match.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-2 rounded-lg font-medium ${
                    match.result === 'Win' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {match.result}
                  </span>
                  <span className="text-[#86d9f9] font-medium text-lg">{match.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

const TabButton = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
      active 
        ? 'bg-[#86d9f9] text-[#1a1b32]' 
        : 'text-[#86d9f9] hover:bg-[#86d9f9]/10'
    }`}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

const StatCard = ({ label, value, icon, gradient }: { label: string; value: string; icon: React.ReactNode; gradient: string }) => (
  <div className={`p-4 rounded-xl bg-gradient-to-br ${gradient} hover:scale-105 hover:shadow-lg hover:shadow-[#86d9f9]/5 transition-all duration-300`}>
    <div className="flex items-center text-[#86d9f9] mb-3">
      {icon}
      <span className="ml-2 text-sm font-medium">{label}</span>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);
