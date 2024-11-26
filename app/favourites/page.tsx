"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useFavourites } from "./favouritesContext";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

export default function FavouritesPage() {
  const { favourites, toggleFavourite } = useFavourites();

  const games = [
    { name: "FIFA", image: "/images/games/fc.jpg", path: "/games/fifa" },
    { name: "CS:GO", image: "/images/games/csgo.png", path: "/games/csgo" },
    { name: "Fortnite", image: "/images/games/fortnite.jpg", path: "/games/fortnite" },
    { name: "Call of Duty", image: "/images/games/cod.png", path: "/games/cod" },
    { name: "League of Legends", image: "/images/games/league-of-legends.png", path: "/games/lol" },
    { name: "Apex Legends", image: "/images/games/apex-legends.png", path: "/games/apex" },
    { name: "Rocket League", image: "/images/games/rocket-league.png", path: "/games/rocketleague" },
  ];

  const favouriteGames = games.filter((game) => favourites.includes(game.name));

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] p-8">
      {/* Header */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#00e7ff] to-[#0077ff] bg-clip-text text-transparent"
      >
        Your Favourites
      </motion.h1>

      {favouriteGames.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {favouriteGames.map((game, index) => (
            <motion.div
              key={game.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative w-full aspect-[2/3] bg-[#1a1b32] 
                border border-[#86d9f9]/20 shadow-lg group-hover:shadow-[0_0_20px_rgba(134,217,249,0.2)]
                rounded-xl overflow-hidden group-hover:-translate-y-2 transition-all duration-300">
                
                <Link href={game.path} className="block">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 
                      group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b32] via-transparent to-transparent 
                    opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                </Link>

                {/* Favorite Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavourite(game.name)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#1a1b32]/80 
                    backdrop-blur-sm border border-[#86d9f9]/20 z-10
                    hover:bg-[#2e3354]/80 transition-all duration-300"
                >
                  <SolidHeartIcon className="w-6 h-6 text-red-500" />
                </motion.button>

                {/* Game Info */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#1a1b32] to-transparent">
                  <h3 className="text-lg font-bold text-center text-[#86d9f9] mb-3
                    group-hover:text-white transition-colors duration-300">
                    {game.name}
                  </h3>
                  <Link href={game.path}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 rounded-lg bg-[#00e7ff]/90 hover:bg-[#00e7ff] 
                        text-[#1a1b32] font-bold text-sm transition-colors duration-300
                        shadow-[0_0_20px_rgba(0,231,255,0.3)]"
                    >
                      Play Now
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-400 text-lg">
          You haven't added any favourites yet.
        </p>
      )}
    </main>
  );
}
