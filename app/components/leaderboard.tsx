"use client";

import { useState } from "react";

const allPlayers = Array.from({ length: 100 }, (_, i) => ({
  rank: i + 1,
  name: `Player${i + 1}`,
  wagered: `${(5000 - i * 50).toFixed(2)} BTC`,
}));

export default function Leaderboard() {
  const [visiblePlayers, setVisiblePlayers] = useState(10);
  const [currentPlayerRank, setCurrentPlayerRank] = useState(50); // Assuming current user rank is 50

  const handleLoadMore = () => {
    setVisiblePlayers((prev) => Math.min(prev + 10, allPlayers.length));
  };

  const handleClose = () => {
    setVisiblePlayers(10);
  };

  const getSurroundingPlayers = () => {
    const start = Math.max(currentPlayerRank - 3, 0); // Two ranks above
    const end = Math.min(currentPlayerRank + 2, allPlayers.length); // Two ranks below
    return allPlayers.slice(start, end);
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] p-6 rounded-xl shadow-2xl w-full max-w-5xl mx-auto">
      {/* Top 100 Leaderboard Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#00e7ff] mb-6 text-center">Leaderboard</h3>
        <table className="w-full text-sm text-left text-[#c3c8f3] border-separate border-spacing-0">
          <thead className="text-xs uppercase bg-[#2e3354] text-[#86d9f9]">
            <tr>
              <th scope="col" className="px-4 py-3 text-center">Rank</th>
              <th scope="col" className="px-4 py-3 text-center">Player</th>
              <th scope="col" className="px-4 py-3 text-center">Wagered</th>
            </tr>
          </thead>
          <tbody>
            {allPlayers.slice(0, visiblePlayers).map((player, index) => (
              <tr
                key={player.rank}
                className={`${
                  index % 2 === 0 ? "bg-[#1a1b32]" : "bg-[#292d3e]"
                } hover:bg-[#2e3354] transition-all`}
              >
                <td className="px-4 py-3 text-center font-semibold text-[#86d9f9]">{player.rank}</td>
                <td className="px-4 py-3 text-center">{player.name}</td>
                <td className="px-4 py-3 text-center">{player.wagered}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-4 w-full">
            <label
              className="text-[#86d9f9] font-medium"
              htmlFor="visiblePlayers"
            >
              Show Players:
            </label>
            <input
              id="visiblePlayers"
              type="range"
              min="10"
              max={allPlayers.length}
              value={visiblePlayers}
              onChange={(e) => setVisiblePlayers(Number(e.target.value))}
              className="w-full h-2 bg-[#2e3354] rounded-lg appearance-none cursor-pointer accent-[#86d9f9]"
            />
            <span className="text-[#86d9f9] font-semibold">{visiblePlayers}</span>
          </div>
          {visiblePlayers > 10 && (
            <button
              onClick={handleClose}
              className="ml-4 px-6 py-2 bg-[#ff475a] text-white rounded-lg hover:bg-[#c43e3e] shadow-md transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Your Rank Section */}
      <div className="mt-8 pt-6 border-t border-[#292d3e]">
        <h4 className="text-2xl font-bold text-[#00e7ff] mb-6 text-center">Your Rank</h4>
        <table className="w-full text-sm text-left text-[#c3c8f3] border-separate border-spacing-0">
          <thead className="text-xs uppercase bg-[#2e3354] text-[#86d9f9]">
            <tr>
              <th scope="col" className="px-4 py-3 text-center">Rank</th>
              <th scope="col" className="px-4 py-3 text-center">Player</th>
              <th scope="col" className="px-4 py-3 text-center">Wagered</th>
            </tr>
          </thead>
          <tbody>
            {getSurroundingPlayers().map((player, index) => (
              <tr
                key={player.rank}
                className={`${
                  player.rank === currentPlayerRank
                    ? "bg-[#4b86e1]"
                    : index % 2 === 0
                    ? "bg-[#1a1b32]"
                    : "bg-[#292d3e]"
                } hover:bg-[#2e3354] transition-all`}
              >
                <td className="px-4 py-3 text-center font-semibold text-[#86d9f9]">{player.rank}</td>
                <td className="px-4 py-3 text-center">{player.name}</td>
                <td className="px-4 py-3 text-center">{player.wagered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
