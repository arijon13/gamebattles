"use client";

import Link from "next/link";
import { Tooltip } from "../components/ui/tooltip";
import {
  HomeIcon,
  TrophyIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ClockIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

const mainLinks = [
  { href: "/", label: "Home", icon: <HomeIcon className="w-6 h-6" /> },
  { href: "/leaderboard", label: "Leaderboard", icon: <TrophyIcon className="w-6 h-6" /> },
  { href: "/find-players", label: "Find Players", icon: <MagnifyingGlassIcon className="w-6 h-6" /> },
  { href: "/favourites", label: "Favourites", icon: <HeartIcon className="w-6 h-6" /> },
  { href: "/recent", label: "Recent", icon: <ClockIcon className="w-6 h-6" /> },
  { href: "/all-games", label: "Games", icon: <PlayIcon className="w-6 h-6" /> },
];

export default function Sidebar({
  menuOpen,
  toggleMenu,
}: {
  menuOpen: boolean;
  toggleMenu: () => void;
}) {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen transition-all duration-300 ${
        menuOpen ? "w-64" : "w-16"
      } bg-[#10132b]/95 backdrop-blur-sm shadow-xl z-50 flex flex-col`}
    >
      {/* Horizontal line under header */}
      <div className="absolute w-full" style={{
        height: "2px",
        top: "69px",
        background: "linear-gradient(to right, #00e7ff, #0077ff)",
        boxShadow: "0 0 8px rgba(0,231,255,0.8)"
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

      {/* Main Links with Tooltips */}
      <div className="mt-4 flex flex-col items-center flex-grow">
        <nav className="w-full space-y-2 px-2">
          {mainLinks.map((link) => (
            <Tooltip key={link.href} content={link.label} side="right">
              <Link
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
            </Tooltip>
          ))}
        </nav>
      </div>

      {/* Total Bets Section */}
      {menuOpen && (
        <div className="mt-auto mb-6 px-4 py-4 border-t border-[#2e3354]/30">
          <div className="bg-gradient-to-r from-[#1a1d31] to-[#2e3354] 
                        p-3 rounded-xl border border-[#3d4674]/30 text-center">
            <p className="text-xs text-[#86d9f9] mb-1">Total Bets Placed</p>
            <p className="text-xl font-bold bg-gradient-to-r from-[#00e7ff] to-[#0077ff] 
                         bg-clip-text text-transparent">
              1,234,567
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
