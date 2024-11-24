"use client";

import { useAuth } from "../authcontext";
import Link from "next/link";
import { useState } from "react";
import WalletPopup from "./wallet-popup";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const { isLoggedIn, logout, balance } = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  const [showBalanceDropdown, setShowBalanceDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showWalletPopup, setShowWalletPopup] = useState(false);

  const currencies = [
    { name: "BTC", balance: balance, icon: "/images/coins/btc.png" },
    { name: "ETH", balance: balance * 20, icon: "/images/coins/eth.png" },
    { name: "USDT", balance: balance * 100, icon: "/images/coins/usdt.png" },
  ];

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowWalletPopup(false);
  };

  const toggleBalanceDropdown = () => {
    setShowBalanceDropdown(!showBalanceDropdown);
  };

  const toggleWalletPopup = () => {
    setShowWalletPopup(!showWalletPopup);
    setShowProfileDropdown(false);
  };

  return (
    <>
      <header
        className="bg-[#10132b] flex flex-col justify-between shadow-lg sticky top-0 z-50"
        style={{ height: "71px" }}
      >
        <div className="flex items-center justify-between h-full">
          {/* GameBattles Title */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-extrabold text-[#00e7ff] tracking-wide hover:text-[#00b9d6] transition-colors"
            style={{ marginLeft: "400px" }}
          >
            GameBattles
          </Link>

          {/* Balance Display */}
          {isLoggedIn && (
            <div
              className="absolute left-1/2 transform -translate-x-1/2 flex items-center"
              style={{ minWidth: "140px", height: "40px", zIndex: 20 }}
            >
              <button
                onClick={toggleBalanceDropdown}
                className="flex items-center px-4 py-2 rounded-l-lg border border-[#00e7ff] text-white bg-transparent hover:bg-[#1b2148] h-[40px] transition-all"
              >
                <span>{balance ? balance.toFixed(8) : "0.00"}</span>
                <img
                  src={currencies.find((c) => c.name === selectedCurrency)?.icon}
                  alt={selectedCurrency}
                  className="w-5 h-5 ml-2"
                />
              </button>
              <button
                onClick={toggleWalletPopup}
                className="px-4 py-2 bg-[#00e7ff] text-white rounded-r-lg h-[40px] hover:bg-[#00b9d6] transition-all"
                style={{ marginLeft: "-1px", zIndex: 30 }}
              >
                Wallet
              </button>
              {showBalanceDropdown && (
                <div
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-48 bg-[#2e3354] border border-[#494e6b] rounded-md shadow-lg"
                  style={{ zIndex: 25 }}
                >
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
                          <img
                            src={currency.icon}
                            alt={currency.name}
                            className="w-5 h-5"
                          />
                          <span>{currency.name}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Login/Register or Profile */}
          <div className="flex items-center space-x-4" style={{ marginRight: "400px" }}>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center"
                >
                  <UserCircleIcon className="w-8 h-8 text-[#00e7ff] hover:text-[#00b9d6] transition-all" />
                </button>
                {showProfileDropdown && (
                  <div
                    className="absolute top-full mt-2 right-0 w-48 bg-[#2e3354] border border-[#494e6b] rounded-md shadow-lg"
                    style={{ zIndex: 35 }}
                  >
                    <ul className="py-2 text-[#c3c8f3]">
                      <li className="px-4 py-2 hover:bg-[#86d9f9] cursor-pointer">
                        <Link href="/profile">Profile</Link>
                      </li>
                      <li
                        onClick={toggleWalletPopup}
                        className="px-4 py-2 hover:bg-[#86d9f9] cursor-pointer"
                      >
                        Wallet
                      </li>
                      <li className="px-4 py-2 hover:bg-[#86d9f9] cursor-pointer">
                        <Link href="/friends">Friends</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-[#86d9f9] cursor-pointer">Statistics</li>
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
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-[#e6e9f5] px-4 py-2 rounded-lg bg-transparent hover:bg-[#556cd6] transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="text-white px-4 py-2 rounded-lg bg-[#556cd6] hover:bg-[#4056b6] transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Glødende linje under header */}
        <div
          className="header-sidebar-line"
          style={{
            height: "2px",
            width: "100%",
            background: "linear-gradient(to right, #00e7ff, #00b9d6)",
            boxShadow: "0px 0px 8px rgba(0, 231, 255, 0.8)",
            zIndex: 1,
          }}
        />
      </header>

      {/* Wallet Popup */}
      {showWalletPopup && <WalletPopup onClose={toggleWalletPopup} />}
    </>
  );
}
