"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const games = [
    { name: "FIFA", image: "/images/games/fc.jpg", path: "/games/fifa" },
    { name: "CS:GO", image: "/images/games/csgo.png", path: "/games/csgo" },
    { name: "Fortnite", image: "/images/games/fortnite.jpg", path: "/games/fortnite" },
    { name: "Call of Duty", image: "/images/games/cod.png", path: "/games/cod" },
    { name: "League of Legends", image: "/images/games/league-of-legends.png", path: "/games/lol" },
    { name: "Apex Legends", image: "/images/games/apex-legends.png", path: "/games/apexlegends" },
    { name: "Rocket League", image: "/images/games/rocket-league.png", path: "/games/rocketleague" },
  ];

  const tournaments = [
    { name: "Fortnite Showdown", description: "Compete in the ultimate Fortnite tournament!", image: "/images/games/fortnite.jpg" },
    { name: "CS:GO Major", description: "Prove your skills in this major CS:GO event!", image: "/images/games/csgo.png" },
    { name: "FIFA Ultimate", description: "Join the best FIFA players in this showdown!", image: "/images/games/fc.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const gamesToShow = 6;

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredGames.length - gamesToShow : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === filteredGames.length - gamesToShow ? 0 : prevIndex + 1));
  };

  return (
    <main className="bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] text-white py-10 flex flex-col items-center space-y-16 font-exo">
      {/* Tournaments Section */}
      <div className="flex justify-center w-full max-w-5xl px-6 space-x-4">
        {tournaments.map((tournament, index) => (
          <div
            key={index}
            className="w-1/3 rounded-lg overflow-hidden bg-gradient-to-br from-[#3b206f] to-[#2d385e] shadow-2xl p-4 flex flex-col items-center space-y-2 transform transition-transform hover:scale-105"
          >
            <img src={tournament.image} alt={tournament.name} className="w-full h-32 object-cover rounded-md shadow-md" />
            <h3 className="text-lg font-semibold text-[#86d9f9]">{tournament.name}</h3>
            <p className="text-sm text-[#a5b3e5]">{tournament.description}</p>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center w-full max-w-5xl px-6 mb-12 relative">
        <input
          type="text"
          placeholder="Search your game"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[calc(100%-2rem)] max-w-[960px] p-2.5 pl-10 rounded-full bg-[#232546] text-white placeholder-[#6672a1] focus:outline-none focus:ring-2 focus:ring-[#78c5eb] border border-[#8299f5] shadow-lg"
        />
        <span className="absolute left-12 top-1/2 transform -translate-y-1/2 text-[#78c5eb]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
          </svg>
        </span>
      </div>

      {/* Carousel Section with Games Title */}
      <section className="relative flex flex-col items-start max-w-5xl w-full px-8 pt-4 pb-20">
        <h2 className="text-2xl font-bold text-[#00e7ff] mb-4">Games</h2>
        <div className="flex space-x-4 overflow-hidden w-full justify-center">
          {filteredGames.slice(currentIndex, currentIndex + gamesToShow + 1).map((game, index) => (
            <Link
              key={index}
              href={game.path}
              className={`relative ${index === gamesToShow ? 'w-20 opacity-70 blur-[1px]' : 'w-40'} h-56 rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105`}
              style={{
                borderRadius: '12px',
                marginTop: '15px',
                zIndex: index === gamesToShow ? '10' : '5',
                ...(index === 0 ? { paddingLeft: '5px' } : {}),
              }}
            >
              <img src={game.image} alt={game.name} className="w-full h-full object-cover" style={{ borderRadius: '12px' }} />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2">
                <h3 className="text-[#7ccdef] text-center">{game.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Custom Oval Arrow Buttons */}
        <div className="absolute top-[1.5rem] right-2 flex space-x-1">
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-[#7ccdef] bg-transparent hover:bg-[#3d2f5d] transition-transform transform active:scale-95 shadow-lg"
          >
            <svg fill="currentColor" viewBox="0 0 64 64" className="w-4 h-4 text-[#7ccdef] hover:text-[#a7dff5]">
              <path d="M56 37.486H25.091L35.335 47.73l-6.313 6.314L8 33.022 29.022 12l6.313 6.314-10.244 10.244H56v8.933-.005Z" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-[#7ccdef] bg-transparent hover:bg-[#3d2f5d] transition-transform transform active:scale-95 shadow-lg"
          >
            <svg fill="currentColor" viewBox="0 0 64 64" className="w-4 h-4 text-[#7ccdef] hover:text-[#a7dff5]">
              <path d="M8 37.486h30.909L28.665 47.73l6.313 6.314L56 33.022 34.978 12l-6.313 6.314 10.244 10.244H8v8.933-.005Z" />
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
}
