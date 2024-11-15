// app/layout.tsx

"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { AuthProvider, useAuth } from "./authcontext";
import "./globals.css";

export default function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <title>GameBattles</title>
          <meta name="description" content="A gaming and wagering platform." />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className="min-h-screen bg-[#0a0e1a] text-white font-exo">
          <div className="flex min-h-screen">
            <Aside menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <MainContent menuOpen={menuOpen}>{children}</MainContent>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}

function Aside({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return (
    <aside
      className={`bg-gradient-to-b from-[#1a1e35] via-[#15172d] to-[#0f101e] p-4 h-screen fixed top-0 left-0 transition-all duration-300 ${
        menuOpen ? "w-64" : "w-16"
      } border-r border-[#222437] shadow-[0px_4px_8px_rgba(0,0,0,0.6)] opacity-95`}
    >
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-2xl font-bold w-full text-[#e6e9f5] text-left mb-6 px-2 py-2 focus:outline-none hover:bg-[#292b3d] transition-all rounded-md"
        style={{ transform: 'translate(-4px, -8px)', fontSize: '1.5rem' }}
      >
        ☰
      </button>
      <nav className={`${menuOpen ? "block" : "hidden"} space-y-4`}>
        <Link href="/" className="block text-[#e6e9f5] px-2 py-2 rounded-md hover:bg-[#3c4263]">Home</Link>
        <Link href="/leaderboard" className="block text-[#e6e9f5] px-2 py-2 rounded-md hover:bg-[#3c4263]">Leaderboard</Link>
        <Link href="/find-players" className="block text-[#e6e9f5] px-2 py-2 rounded-md hover:bg-[#3c4263]">Find Players</Link>
        <Link href="/login" className="block text-[#e6e9f5] px-2 py-2 rounded-md hover:bg-[#3c4263]">Login</Link>
      </nav>
    </aside>
  );
}

function MainContent({ children, menuOpen }: { children: ReactNode; menuOpen: boolean }) {
  const { isLoggedIn, balance, logout } = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  const [showBalanceDropdown, setShowBalanceDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const currencies = [
    { name: "BTC", balance: balance, icon: "/images/coins/btc.png" },
    { name: "ETH", balance: balance * 20, icon: "/images/coins/eth.png" },
    { name: "USDT", balance: balance * 100, icon: "/images/coins/usdt.png" },
  ];

  const toggleDropdown = () => {
    setShowBalanceDropdown(!showBalanceDropdown);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div className={`flex-1 flex flex-col transition-all duration-300 ${menuOpen ? 'ml-64' : 'ml-16'}`}>
      {/* Header */}
      <header className="bg-[#1f2236] p-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
          {/* GameBattles Logo aligned closer to center */}
          <h1 className="text-4xl font-extrabold text-[#00d4ff] mr-auto" style={{ marginLeft: '5%' }}>
            GameBattles
          </h1>

          {isLoggedIn ? (
            <div className="relative flex items-center space-x-4 mx-auto">
              {/* Centered Balance and Wallet Button */}
              <div className="flex items-center relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center px-4 py-2 text-center rounded-l-lg border border-[#4b86e1] text-white bg-transparent"
                  style={{ minWidth: "140px", height: "40px" }}
                >
                  <span>{balance.toFixed(8)}</span>
                  <img
                    src={currencies.find((c) => c.name === selectedCurrency)?.icon}
                    alt={selectedCurrency}
                    className="w-5 h-5 ml-2"
                  />
                </button>
                <button
                  className="px-4 py-2 bg-[#4b86e1] text-white rounded-r-lg h-[40px]"
                  style={{ marginLeft: "-1px" }}
                >
                  Wallet
                </button>

                {showBalanceDropdown && (
                  <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-48 bg-[#2e3354] border border-[#494e6b] rounded-md shadow-lg">
                    <ul className="py-2 text-xs">
                      {currencies
                        .filter((c) => c.name !== selectedCurrency)
                        .map((currency) => (
                          <li
                            key={currency.name}
                            onClick={() => {
                              setSelectedCurrency(currency.name);
                              setShowBalanceDropdown(false);
                            }}
                            className="px-4 py-2 flex items-center space-x-2 hover:bg-[#3c4263] cursor-pointer text-[#c3c8f3]"
                          >
                            <span>{currency.balance.toFixed(8)}</span>
                            <img src={currency.icon} alt={currency.name} className="w-5 h-5" />
                            <span>{currency.name}</span>
                          </li>
                        ))}
                    </ul>
                    <div className="px-4 py-2 text-center text-[#81a1f0] cursor-pointer hover:bg-[#3c4263]">
                      Wallet Settings
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown aligned closer to center */}
              <div className="relative ml-4">
                <button onClick={toggleProfileDropdown} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-[#c3c8f3] hover:text-[#ffffff]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#2e3354] border border-[#494e6b] rounded-md shadow-lg">
                    <ul className="py-2 text-[#c3c8f3]">
                      <li className="px-4 py-2 hover:bg-[#3c4263] cursor-pointer">Profile</li>
                      <li className="px-4 py-2 hover:bg-[#3c4263] cursor-pointer">Wallet</li>
                      <li className="px-4 py-2 hover:bg-[#3c4263] cursor-pointer">Friends</li>
                      <li className="px-4 py-2 hover:bg-[#3c4263] cursor-pointer">Statistics</li>
                      <li className="px-4 py-2 hover:bg-[#3c4263] cursor-pointer">Settings</li>
                      <li
                        onClick={logout}
                        className="px-4 py-2 hover:bg-[#3c4263] cursor-pointer text-[#ff475a]"
                      >
                        Log Out
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-x-4 flex items-center ml-auto">
              <Link href="/login" className="text-[#e6e9f5] px-4 py-2 rounded-lg bg-transparent hover:bg-[#556cd6] transition-all">
                Sign In
              </Link>
              <Link href="/register" className="text-white px-4 py-2 rounded-lg bg-[#556cd6] hover:bg-[#6b8df8] transition-all">
                Register
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer with Information Section */}
      <footer className="bg-[#1f2236] text-[#c3c8f3] py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 border-b border-[#00d4ff] pb-1">About Us</h3>
            <ul className="space-y-1">
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/team">Our Team</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>

          {/* Games Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 border-b border-[#00d4ff] pb-1">Games</h3>
            <ul className="space-y-1">
              <li><Link href="/games/fifa">FIFA</Link></li>
              <li><Link href="/games/csgo">CS:GO</Link></li>
              <li><Link href="/games/fortnite">Fortnite</Link></li>
              <li><Link href="/games/cod">Call of Duty</Link></li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2 border-b border-[#00d4ff] pb-1">Customer Service</h3>
            <ul className="space-y-1">
              <li><Link href="/support">Support Center</Link></li>
              <li><Link href="/faq">FAQs</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/self-exclusion">Self Exclusion</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-6 text-center">&copy; 2024 GameBattles. All rights reserved.</p>
      </footer>
    </div>
  );
}
