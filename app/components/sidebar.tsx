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
      } bg-gradient-to-b from-[#1a1e35] via-[#15172d] to-[#0f101e] shadow-lg z-50 flex flex-col justify-start items-center`}
    >
      {/* Horisontal linje under header */}
      <div
        className="absolute w-full"
        style={{
          height: "2px", // Match header line height
          top: "71px", // Matches the bottom of the header
          backgroundColor: "#1f2236", // Same color as header line
          opacity: 0.4, // Match header line opacity
          boxShadow: "0 6px 4px rgba(0, 0, 0, 0.6)", // Stronger shadow for 3D effect
        }}
      ></div>

      {/* Vertikal linje på høyre side */}
      <div
        className="absolute h-full"
        style={{
          width: "2px", // Same thickness as horizontal line
          right: 0, // Align to the right edge of the sidebar
          backgroundColor: "#1f2236", // Same color as other lines
          opacity: 0.4, // Match opacity
          boxShadow: "0 6px 4px rgba(0, 0, 0, 0.6)", // Shadow for depth
        }}
      ></div>

      {/* Toggle Button */}
      <div className="flex items-center justify-center p-4">
        <button
          onClick={toggleMenu}
          className="text-2xl font-bold text-white p-2 hover:bg-[#292b3d] transition rounded-md"
        >
          ☰
        </button>
      </div>

      {/* Main Links Table */}
      <div
        className={`bg-[#2a2f48] rounded-lg shadow-lg mt-4`}
        style={{
          width: menuOpen ? "90%" : "70%", // Wider table when open
          margin: "0 auto", // Center horizontally
          padding: "8px",
        }}
      >
        <nav className="space-y-2">
          {mainLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center transition-all duration-300 ${
                menuOpen
                  ? "justify-start px-4 py-3"
                  : "justify-center w-full h-10 mx-auto"
              } hover:bg-[#3c4263] rounded-md`}
              style={{
                margin: "8px 0", // Space between buttons
                backgroundColor: "#2a2f48",
              }}
            >
              {/* Icon */}
              <span
                className={`text-xl flex items-center justify-center transition-all duration-300`}
                style={{
                  height: "100%", // Vertically centered
                  width: menuOpen ? "24px" : "100%", // Full width in closed state
                  textAlign: "center",
                }}
              >
                {link.icon}
              </span>

              {/* Text */}
              {menuOpen && (
                <span
                  className="text-sm font-medium transition-all duration-300 ml-4"
                  style={{
                    display: menuOpen ? "inline" : "none", // Hide text in closed state
                  }}
                >
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
