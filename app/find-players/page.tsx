"use client";

import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

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
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] text-white p-8 space-y-8">
      {/* Title */}
      <h1 className="text-4xl font-bold text-[#00e7ff] tracking-wide">
        Find Players
      </h1>

      {/* Search Bar */}
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search for players..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 rounded-full bg-[#232546] text-white placeholder-[#6672a1] border border-[#8299f5] focus:outline-none focus:ring-2 focus:ring-[#78c5eb] shadow-lg"
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#78c5eb]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>

      {/* Player List */}
      <ul className="w-full max-w-lg space-y-4">
        {filteredPlayers.map((player) => (
          <li
            key={player.name}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-[#2e3354] to-[#1e223f] rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <UserCircleIcon className="w-8 h-8 text-[#86d9f9]" />
              <a
                href={`/players/${player.name}`} // Fremtidig profilside
                className="text-[#c3c8f3] hover:text-[#00e7ff] transition"
              >
                {player.name}
              </a>
            </div>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#4b86e1] to-[#73a9f1] rounded-md hover:opacity-90 transition-all">
              Add Friend
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
