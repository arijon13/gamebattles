"use client";

import { useAuth } from "../authcontext";
import Link from "next/link";
import { useState } from "react";
import WalletPopup from "./wallet-popup"; // Import Wallet Popup Component

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
    setShowWalletPopup(false); // Ensure only one dropdown is open at a time
  };

  const toggleBalanceDropdown = () => {
    setShowBalanceDropdown(!showBalanceDropdown);
  };

  const toggleWalletPopup = () => {
    setShowWalletPopup(!showWalletPopup);
    setShowProfileDropdown(false); // Ensure only one dropdown is open at a time
  };

  return (
    <>
      <header
        className="bg-[#1f2236] flex flex-col justify-between shadow-md sticky top-0 z-50"
        style={{ height: "71px" }}
      >
        <div className="flex items-center justify-between h-full">
          {/* GameBattles Title */}
          <h1 className="text-3xl font-bold text-[#00d4ff]" style={{ marginLeft: "400px" }}>
            GameBattles
          </h1>

          {/* Balance Display - Centered */}
          {isLoggedIn && (
            <div
              className="absolute left-1/2 transform -translate-x-1/2 flex items-center"
              style={{ minWidth: "140px", height: "40px", zIndex: 20 }} // Ensure Wallet Button is above other elements
            >
              <button
                onClick={toggleBalanceDropdown}
                className="flex items-center px-4 py-2 rounded-l-lg border border-[#4b86e1] text-white bg-transparent h-[40px]"
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
                className="px-4 py-2 bg-[#4b86e1] text-white rounded-r-lg h-[40px]"
                style={{ marginLeft: "-1px", zIndex: 30 }} // Higher z-index for the Wallet button
              >
                Wallet
              </button>
              {showBalanceDropdown && (
                <div
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-48 bg-[#2e3354] border border-[#494e6b] rounded-md shadow-lg"
                  style={{ zIndex: 25 }} // Ensure dropdown appears above other elements
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

          {/* Conditional rendering based on login state */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4 ml-auto" style={{ flex: 1, justifyContent: "flex-end" }}>
              {/* Profile Icon */}
              <div className="relative" style={{ marginRight: "400px", zIndex: 30 }}>
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
                  <div
                    className="absolute top-14 right-0 w-48 bg-[#2e3354] border border-[#494e6b] rounded-md shadow-lg"
                    style={{ zIndex: 35 }} // Ensure Profile Dropdown is above other elements
                  >
                    <ul className="py-2 text-[#c3c8f3]">
                      <li className="px-4 py-2 hover:bg-[#3c4263] cursor-pointer">Profile</li>
                      <li className="px-4 py-2 hover:bg-[#3c4263] cursor-pointer">Wallet</li>
                      <li className="px-4 py-2 hover:bg-[#3c4263] cursor-pointer">Friends</li>
                      <li className="px-4 py-2 hover:bg-[#3c4263] cursor-pointer">Statistics</li>
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
            <div className="flex items-center space-x-4" style={{ marginRight: "400px" }}>
              {/* Login/Register Links */}
              <Link href="/login" className="text-[#e6e9f5] px-4 py-2 rounded-lg bg-transparent hover:bg-[#556cd6]">
                Sign In
              </Link>
              <Link href="/register" className="text-white px-4 py-2 rounded-lg bg-[#556cd6]">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Line at the bottom of the Header */}
        <div className="header-sidebar-line" style={{ height: "2px", width: "100%", zIndex: 1 }} />
      </header>

      {/* Wallet Popup */}
      {showWalletPopup && <WalletPopup onClose={toggleWalletPopup} />}
    </>
  );
}
