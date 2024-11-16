"use client";

import { useState } from "react";

const allPlayers = Array.from({ length: 100 }, (_, i) => ({
  rank: i + 1,
  name: `Player${i + 1}`,
  wagered: `${(5000 - i * 50).toFixed(2)} BTC`,
}));

export default function Leaderboard() {
  const [visiblePlayers, setVisiblePlayers] = useState(10);

  const handleLoadMore = () => {
    setVisiblePlayers((prev) => Math.min(prev + 10, allPlayers.length));
  };

  const handleClose = () => {
    setVisiblePlayers(10);
  };

  return (
    <div className="bg-[#2e3354] p-6 rounded-lg shadow-lg w-full max-w-5xl mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-cyan-300">Leaderboard</h3>
      <table className="w-full text-sm text-left text-cyan-200">
        <thead className="text-xs uppercase bg-[#3c4263] text-cyan-400">
          <tr>
            <th scope="col" className="px-4 py-2">Rank</th>
            <th scope="col" className="px-4 py-2">Player</th>
            <th scope="col" className="px-4 py-2">Wagered</th>
          </tr>
        </thead>
        <tbody>
          {allPlayers.slice(0, visiblePlayers).map((player) => (
            <tr key={player.rank} className="border-b border-[#494e6b] hover:bg-[#3c4263]">
              <td className="px-4 py-2">{player.rank}</td>
              <td className="px-4 py-2">{player.name}</td>
              <td className="px-4 py-2">{player.wagered}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        {/* Slider with a modern design */}
        <div className="flex items-center space-x-2">
          <label className="text-cyan-300 text-sm" htmlFor="visiblePlayers">Show:</label>
          <input
            id="visiblePlayers"
            type="range"
            min="10"
            max={allPlayers.length}
            value={visiblePlayers}
            onChange={(e) => setVisiblePlayers(Number(e.target.value))}
            className="w-full h-2 bg-[#3c4263] rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-cyan-300 text-sm">{visiblePlayers}</span>
        </div>
        {/* Reset button */}
        {visiblePlayers > 10 && (
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-[#ff475a] text-white rounded-lg hover:bg-[#c43e3e] transition-colors"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
