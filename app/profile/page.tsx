"use client";

import { useState } from "react";
import Layout from "@/app/layout"; // Importer Layout-komponenten

export default function Profile() {
  const [user, setUser] = useState({
    username: "Gamer123",
    rank: "Gold II",
    totalWagered: "$1,200",
    totalWins: 45,
    totalLosses: 22,
    winRate: "67%",
    region: "EU",
    anonymous: false, // Ny egenskap for anonym modus
  });

  const [isAnonymous, setIsAnonymous] = useState(user.anonymous);

  const handleSaveChanges = () => {
    setUser({ ...user, anonymous: isAnonymous });
    alert(`Profile updated. Anonymous mode is now: ${isAnonymous ? "On" : "Off"}`);
  };

  return (
    <Layout> {/* Omslutter innholdet med Layout for å vise menyen */}
      <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-10">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-80">
          <h2 className="text-3xl font-bold mb-4">{user.username}</h2>
          <p className="text-lg text-blue-200">Rank: {user.rank}</p>
          <p className="text-lg text-blue-200 mt-2">Total Wagered: {user.totalWagered}</p>

          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-2">Statistics</h3>
            <p className="text-lg">Total Wins: {user.totalWins}</p>
            <p className="text-lg">Total Losses: {user.totalLosses}</p>
            <p className="text-lg">Win Rate: {user.winRate}</p>
          </div>

          {/* Velg region */}
          <div className="mt-6">
            <label htmlFor="region" className="block text-lg mb-2">Region:</label>
            <select
              id="region"
              value={user.region}
              onChange={(e) => setUser({ ...user, region: e.target.value })}
              className="w-full px-4 py-2 text-gray-900 rounded-md"
            >
              <option value="EU">EU</option>
              <option value="NAE">NAE</option>
              <option value="NAW">NAW</option>
              <option value="ASIA">ASIA</option>
            </select>
          </div>

          {/* Anonym modus bryter */}
          <div className="mt-6 flex items-center">
            <span className="text-lg mr-4">Anonym Modus</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(!isAnonymous)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-500 rounded-full peer-checked:bg-green-500 transition-colors duration-200"></div>
              <div className="absolute left-1 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 transform peer-checked:translate-x-full"></div>
            </label>
          </div>

          {/* Lagre endringer */}
          <button
            onClick={handleSaveChanges}
            className="px-6 py-2 mt-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </main>
    </Layout>
  );
}
