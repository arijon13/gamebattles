"use client";

import Link from "next/link";
import {
  HomeIcon,
  TrophyIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ClockIcon,
  PlayIcon, // Ikon for Games
} from "@heroicons/react/24/outline";

export default function Sidebar({
  menuOpen,
  toggleMenu,
}: {
  menuOpen: boolean;
  toggleMenu: () => void;
}) {
  const mainLinks = [
    { href: "/", label: "Home", icon: <HomeIcon className="w-6 h-6" /> },
    { href: "/leaderboard", label: "Leaderboard", icon: <TrophyIcon className="w-6 h-6" /> },
    { href: "/find-players", label: "Find Players", icon: <MagnifyingGlassIcon className="w-6 h-6" /> },
    { href: "/favourites", label: "Favourites", icon: <HeartIcon className="w-6 h-6" /> },
    { href: "/recent", label: "Recent", icon: <ClockIcon className="w-6 h-6" /> },
    { href: "/all-games", label: "Games", icon: <PlayIcon className="w-6 h-6" /> },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen transition-all duration-300 ${
        menuOpen ? "w-64" : "w-16"
      } bg-[#10132b]/95 backdrop-blur-sm shadow-xl z-50 flex flex-col`}
    >
      {/* Horizontal line under header - Updated to match header exactly */}
      <div className="absolute w-full" style={{
        height: "2px",
        top: "69px",
        background: "linear-gradient(to right, #00e7ff, #0077ff)",
        boxShadow: "0 0 8px rgba(0,231,255,0.8)" // Updated to match header's shadow
      }} />

      {/* Vertical line on right side */}
      <div className="absolute h-full" style={{
        width: "2px",
        right: 0,
        background: "linear-gradient(to bottom, #00e7ff, #0077ff)",
        boxShadow: "4px 0 6px rgba(0, 231, 255, 0.4)"
      }} />

      {/* Toggle Button */}
      <div className="flex items-center justify-center p-4 h-[71px]">
        <button
          onClick={toggleMenu}
          className="text-[#86d9f9] p-2 hover:bg-[#2e3354]/50 transition-all rounded-lg"
        >
          ☰
        </button>
      </div>

      {/* Main Links */}
      <div className="mt-4 flex flex-col items-center">
        <nav className="w-full space-y-2 px-2">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center transition-all duration-300 ${
                menuOpen ? "justify-start px-4 py-3" : "justify-center w-full h-12"
              } hover:bg-[#2e3354]/50 rounded-lg group`}
            >
              <span className="text-[#86d9f9] group-hover:text-[#00e7ff] transition-all duration-300">
                {link.icon}
              </span>
              {menuOpen && (
                <span className="text-sm font-medium text-[#86d9f9] group-hover:text-[#00e7ff] ml-4 transition-all duration-300">
                  {link.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
