"use client";

import Link from "next/link";

export default function Menu({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return (
    <aside
      className={`bg-gradient-to-b from-[#1a1e35] via-[#15172d] to-[#0f101e] p-4 h-screen fixed top-0 left-0 transition-all duration-300 ${
        menuOpen ? "w-64" : "w-16"
      } border-r border-[#222437] shadow-[0px_4px_8px_rgba(0,0,0,0.6)] opacity-95`}
    >
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-2xl font-bold w-full text-[#e6e9f5] text-left mb-6 px-2 py-2 focus:outline-none hover:bg-[#292b3d] transition-all rounded-md"
      >
        ☰
      </button>
      <nav className={`${menuOpen ? "block" : "hidden"} space-y-4`}>
        <Link href="/" className="block text-[#e6e9f5] px-2 py-2 rounded-md hover:bg-[#3c4263]">Home</Link>
        <Link href="/leaderboard" className="block text-[#e6e9f5] px-2 py-2 rounded-md hover:bg-[#3c4263]">Leaderboard</Link>
      </nav>
    </aside>
  );
}
