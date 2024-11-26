"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useFavourites } from "../favourites/favouritesContext";
import {
  HeartIcon as OutlineHeartIcon,
  HeartIcon as SolidHeartIcon,
} from "@heroicons/react/24/outline";

const games = [
  { name: "FIFA", image: "/images/games/fc.jpg", path: "/games/fifa" },
  { name: "CS:GO", image: "/images/games/csgo.png", path: "/games/csgo" },
  { name: "Fortnite", image: "/images/games/fortnite.jpg", path: "/games/fortnite" },
  { name: "Call of Duty", image: "/images/games/cod.png", path: "/games/cod" },
  { name: "League of Legends", image: "/images/games/league-of-legends.png", path: "/games/lol" },
  { name: "Apex Legends", image: "/images/games/apex-legends.png", path: "/games/apex" },
  { name: "Rocket League", image: "/images/games/rocket-league.png", path: "/games/rocketleague" },
];

export default function AllGamesPage() {
  const { favourites, toggleFavourite } = useFavourites();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#00e7ff] to-[#0077ff] bg-clip-text text-transparent"
      >
        All Games
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {games.map((game, index) => (
          <motion.div
            key={game.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="relative w-full aspect-[3/4] bg-[#1a1b32] 
              border border-[#86d9f9]/20 shadow-lg group-hover:shadow-[0_0_20px_rgba(134,217,249,0.2)]
              rounded-lg overflow-hidden group-hover:-translate-y-2 transition-all duration-300">
              
              <Link href={game.path} className="block">
                <img
                  src={game.image}
                  alt={game.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 
                    group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b32] via-transparent to-transparent 
                  opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              </Link>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleFavourite(game.name)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#1a1b32]/80 
                  backdrop-blur-sm border border-[#86d9f9]/20 z-10
                  hover:bg-[#2e3354]/80 transition-all duration-300"
              >
                {favourites.includes(game.name) ? (
                  <SolidHeartIcon className="w-6 h-6 text-red-500" />
                ) : (
                  <OutlineHeartIcon className="w-6 h-6 text-[#86d9f9]" />
                )}
              </motion.button>

              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#1a1b32] to-transparent">
                <h3 className="text-base font-bold text-center text-[#86d9f9] mb-2
                  group-hover:text-white transition-colors duration-300">
                  {game.name}
                </h3>
                <Link href={game.path}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-1.5 rounded-lg bg-[#00e7ff]/90 hover:bg-[#00e7ff] 
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
    </main>
  );
}
