"use client";

import { useState } from "react";
import Head from "next/head";

interface Player {
  rank: number;
  player: string;
  wagered: number;
  isAnonymous: boolean;
}

export default function Leaderboard() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const topPlayers: Player[] = Array.from({ length: 100 }, (_, i) => ({
    rank: i + 1,
    player: `Player${i + 1}`,
    wagered: 1000 - i * 10,
    isAnonymous: i % 10 === 0, // Noen spillere vil ha anonym modus aktivert
  }));

  const yourRank = 55;
  const yourData = {
    rank: yourRank,
    player: "You",
    wagered: 450,
    isAnonymous: false,
  };

  const surroundingPlayers = [
    { rank: yourRank - 2, player: `Player${yourRank - 2}`, wagered: 460, isAnonymous: false },
    { rank: yourRank - 1, player: `Player${yourRank - 1}`, wagered: 455, isAnonymous: false },
    yourData,
    { rank: yourRank + 1, player: `Player${yourRank + 1}`, wagered: 445, isAnonymous: false },
    { rank: yourRank + 2, player: `Player${yourRank + 2}`, wagered: 440, isAnonymous: false },
  ];

  const handlePlayerClick = (player: Player) => {
    if (!player.isAnonymous) {
      setSelectedPlayer(player);
    }
  };

  return (
    <>
      <Head>
        <title>Leaderboard - GameBattles</title>
      </Head>

      <main className="bg-gray-900 text-white flex flex-col items-center py-16">
        <section className="mt-16 max-w-3xl w-full text-center">
          <h2 className="text-4xl font-bold text-blue-300 mb-8">Leaderboard - Top 100</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
            <table className="table-auto w-full text-left text-gray-300">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2">Player</th>
                  <th className="px-4 py-2">Total Wagered ($)</th>
                </tr>
              </thead>
              <tbody>
                {topPlayers.map((player) => (
                  <tr
                    key={player.rank}
                    className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
                    onClick={() => handlePlayerClick(player)}
                  >
                    <td className="px-4 py-2">{player.rank}</td>
                    <td className="px-4 py-2">
                      {player.isAnonymous ? "Anonymous" : player.player}
                    </td>
                    <td className="px-4 py-2">${player.wagered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl font-bold text-blue-400 mb-4">Your Rank</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <table className="table-auto w-full text-left text-gray-300">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2">Player</th>
                  <th className="px-4 py-2">Total Wagered ($)</th>
                </tr>
              </thead>
              <tbody>
                {surroundingPlayers.map((player) => (
                  <tr
                    key={player.rank}
                    className={`border-b border-gray-700 hover:bg-gray-700 ${
                      player.player === "You" ? "bg-blue-500" : ""
                    }`}
                  >
                    <td className="px-4 py-2">{player.rank}</td>
                    <td className="px-4 py-2">{player.player}</td>
                    <td className="px-4 py-2">${player.wagered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Player Details Modal */}
        {selectedPlayer && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-80 text-center">
              <h3 className="text-2xl font-bold mb-4">{selectedPlayer.player} - Details</h3>
              <p className="text-lg">Rank: {selectedPlayer.rank}</p>
              <p className="text-lg">Total Wagered: ${selectedPlayer.wagered}</p>
              <button
                onClick={() => setSelectedPlayer(null)}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
