"use client";

import Link from "next/link";
import { useFavourites } from "../favourites/favouritesContext";
import {
  HeartIcon as OutlineHeartIcon,
  HeartIcon as SolidHeartIcon,
} from "@heroicons/react/24/solid"; // Riktig import for SolidHeartIcon

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
    <main className="bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] text-white min-h-screen py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Favourites</h1>

      {favouriteGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favouriteGames.map((game) => (
            <div
              key={game.path}
              className="relative bg-[#292d3e] p-4 rounded-lg shadow-md hover:bg-[#3d435e] transition-colors"
            >
              <button
                onClick={() => toggleFavourite(game.name)}
                className="absolute top-4 right-4 p-1 bg-[#1f2236] rounded-full hover:bg-[#3d435e] transition"
              >
                <SolidHeartIcon className="w-6 h-6 text-red-500" />
              </button>

              <Link href={game.path} className="block">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-bold text-[#86d9f9] text-center">{game.name}</h2>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-lg">
          You haven't added any favourites yet.
        </p>
      )}
    </main>
  );
}
