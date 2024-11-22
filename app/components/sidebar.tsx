"use client";

import Link from "next/link";

export default function Sidebar({
  menuOpen,
  toggleMenu,
}: {
  menuOpen: boolean;
  toggleMenu: () => void;
}) {
  const mainLinks = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/leaderboard", label: "Leaderboard", icon: "🏆" },
    { href: "/find-players", label: "Find Players", icon: "🔍" },
    { href: "/login", label: "Login", icon: "🔑" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen transition-all duration-300 ${
        menuOpen ? "w-64" : "w-16"
      } bg-gradient-to-b from-[#141e3d] via-[#10132b] to-[#0d0f26] shadow-xl z-50 flex flex-col`}
    >
      {/* Horisontal linje under header */}
      <div
        className="absolute w-full"
        style={{
          height: "2px",
          top: "69px",
          backgroundColor: "#00e7ff", // Samme som headerlinjen
          opacity: 0.8,
          boxShadow: "0 4px 6px rgba(0, 231, 255, 0.4)",
        }}
      ></div>

      {/* Vertikal linje på høyre side */}
      <div
        className="absolute h-full"
        style={{
          width: "2px",
          right: 0,
          backgroundColor: "#00e7ff", // Samme som andre linjer
          opacity: 0.8,
          boxShadow: "0 4px 6px rgba(0, 231, 255, 0.4)",
        }}
      ></div>

      {/* Toggle Button */}
      <div className="flex items-center justify-center p-4">
        <button
          onClick={toggleMenu}
          className="text-2xl font-bold text-white p-2 hover:bg-[#1a223f] transition rounded-md"
        >
          ☰
        </button>
      </div>

      {/* Main Links Table */}
      <div className={`mt-4 flex flex-col items-center`}>
        <nav className="w-full space-y-2">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center transition-all duration-300 ${
                menuOpen
                  ? "justify-start px-4 py-3"
                  : "justify-center w-full h-12"
              } hover:bg-[#1a223f] rounded-md`}
            >
              {/* Icon */}
              <span
                className={`text-2xl text-[#00e7ff] transition-all duration-300`}
              >
                {link.icon}
              </span>

              {/* Text */}
              {menuOpen && (
                <span className="text-sm font-medium text-[#e6e9f5] ml-4">
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
