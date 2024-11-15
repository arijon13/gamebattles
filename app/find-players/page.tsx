"use client";

import { useState } from "react";

export default function FindPlayers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState([
    { name: "Player1", region: "EU" },
    { name: "Player2", region: "NAE" },
    { name: "Player3", region: "NAW" },
    { name: "Player4", region: "EU" },
    { name: "Player5", region: "ASIA" },
  ]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl mb-4">Finn spillere</h1>
      <input
        type="text"
        placeholder="Søk etter spillere..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-6 p-2 rounded bg-gray-800 text-white"
      />
      
      <ul className="w-full max-w-md">
        {filteredPlayers.map((player) => (
          <li
            key={player.name}
            className="bg-gray-800 p-4 mb-4 rounded flex justify-between items-center"
          >
            <span>{player.name} - {player.region}</span>
            <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-400">
              Legg til venn
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
