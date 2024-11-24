"use client";

import { useState } from "react";
import Layout from "@/app/layout"; // Import Layout Component

export default function Profile() {
  const [user, setUser] = useState({
    username: "Gamer123",
    rank: "Gold II",
    totalWagered: "$1,200",
    totalWins: 45,
    totalLosses: 22,
    winRate: "67%",
    profilePicture: "/images/default-profile.png",
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
    <Layout>
      <main className="bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] text-white min-h-screen flex justify-center items-center">
        <div className="bg-gradient-to-b from-[#2e3354] to-[#1e233b] p-8 rounded-xl shadow-2xl w-full max-w-lg text-center">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-4 border-[#00e7ff] shadow-md"
            />
            <label
              htmlFor="profilePicture"
              className="absolute bottom-0 right-12 bg-[#00e7ff] p-2 rounded-full cursor-pointer hover:bg-[#00b9d6] transition-all"
              title="Change Profile Picture"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A1 1 0 0 1 5 17.414V15m0-4.586V7.414A2 2 0 0 1 6.414 6h3.172a2 2 0 0 1 1.414.586l1.414 1.414a2 2 0 0 0 1.414.586h3.172A2 2 0 0 1 19 10v3.586a2 2 0 0 1-.586 1.414l-7 7A2 2 0 0 1 10 22H6.414A2 2 0 0 1 5 20.586V18a1 1 0 0 1 .121-.196l-.001.001z"
                />
              </svg>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </label>
          </div>

          {/* User Information */}
          <h1 className="text-2xl font-bold mt-6 mb-2">{user.username}</h1>
          <p className="text-lg text-[#86d9f9] mb-4">{user.rank}</p>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-[#1a1b32] p-4 rounded-lg shadow-md">
              <p className="text-gray-400">Total Wagered</p>
              <p className="text-[#00e7ff] font-semibold">{user.totalWagered}</p>
            </div>
            <div className="bg-[#1a1b32] p-4 rounded-lg shadow-md">
              <p className="text-gray-400">Win Rate</p>
              <p className="text-[#00e7ff] font-semibold">{user.winRate}</p>
            </div>
            <div className="bg-[#1a1b32] p-4 rounded-lg shadow-md">
              <p className="text-gray-400">Total Wins</p>
              <p className="text-[#00e7ff] font-semibold">{user.totalWins}</p>
            </div>
            <div className="bg-[#1a1b32] p-4 rounded-lg shadow-md">
              <p className="text-gray-400">Total Losses</p>
              <p className="text-[#00e7ff] font-semibold">{user.totalLosses}</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
