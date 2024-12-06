"use client";

import { useAuth } from "../authcontext";
import Link from "next/link";
import { useState, useEffect } from "react";
import WalletPopup from "./wallet-popup";
import { 
  UserCircleIcon,
  BellIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import { BellAlertIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const { isLoggedIn, logout, btcBalance, ethBalance, usdtBalance, updateBalance } = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  const [showBalanceDropdown, setShowBalanceDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [hasActiveMatch, setHasActiveMatch] = useState(true);

  const notifications = [
    {
      id: 1,
      title: "Match Found!",
      message: "Your $25 match is ready to begin",
      time: "2 minutes ago",
      unread: true,
      type: "match"
    },
    {
      id: 2,
      title: "Tournament Starting",
      message: "CS:GO Major starts in 30 minutes",
      time: "30 minutes ago",
      unread: true,
      type: "tournament"
    },
    {
      id: 3,
      title: "Deposit Successful",
      message: "Successfully deposited 0.5 BTC",
      time: "2 hours ago",
      unread: false,
      type: "wallet"
    }
  ];

  useEffect(() => {
    console.log('Current balances:', { btcBalance, ethBalance, usdtBalance });
  }, [btcBalance, ethBalance, usdtBalance]);

  const currencies = [
    { name: "BTC", balance: Number(btcBalance || 0), icon: "/images/coins/btc.png" },
    { name: "ETH", balance: Number(ethBalance || 0), icon: "/images/coins/eth.png" },
    { name: "USDT", balance: Number(usdtBalance || 0), icon: "/images/coins/usdt.png" },
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

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfileDropdown(false);
    setShowWalletPopup(false);
    if (hasUnread) setHasUnread(false);
  };

  const getCurrentBalance = () => {
    const currency = currencies.find(c => c.name === selectedCurrency);
    const balance = currency ? currency.balance : 0;
    return isNaN(balance) ? '0.00000000' : balance.toFixed(8);
  };

  return (
    <>
      <header
        className="bg-[#10132b]/95 backdrop-blur-sm flex flex-col justify-between shadow-lg sticky top-0 z-50"
        style={{ height: "71px" }}
      >
        <div className="flex items-center justify-between h-full px-6">
          {/* Left side with GameBattles title */}
          <div className="flex items-center" style={{ width: "400px" }}>
            <Link
              href="/"
              className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#00e7ff] to-[#0077ff] 
                bg-clip-text text-transparent hover:opacity-80 transition-opacity ml-16"
            >
              GameBattles
            </Link>
          </div>

          {/* Center section with balance */}
          <div className="flex-1 flex justify-center">
            {isLoggedIn && (
              <div className="flex items-center relative" style={{ minWidth: "140px", height: "40px" }}>
                <button
                  onClick={toggleBalanceDropdown}
                  className="flex items-center px-4 py-2 rounded-l-lg border border-[#86d9f9]/20 
                    text-white bg-[#1a1b32]/80 hover:bg-[#2e3354]/80 h-[40px] transition-all backdrop-blur-sm"
                >
                  <span>{getCurrentBalance()}</span>
                  <img
                    src={currencies.find((c) => c.name === selectedCurrency)?.icon}
                    alt={selectedCurrency}
                    className="w-5 h-5 ml-2"
                  />
                </button>
                <button
                  onClick={toggleWalletPopup}
                  className="px-4 py-2 bg-[#00e7ff] text-[#1a1b32] font-semibold rounded-r-lg h-[40px] 
                    hover:bg-[#00b9d6] transition-all shadow-[0_0_20px_rgba(0,231,255,0.3)]"
                  style={{ marginLeft: "-1px" }}
                >
                  Wallet
                </button>
                {showBalanceDropdown && (
                  <div
                    className="absolute top-full mt-2 bg-[#2e3354] border border-[#494e6b] rounded-md shadow-lg"
                    style={{ 
                      zIndex: 25,
                      left: '0',
                      width: 'calc(100% - 82px)',
                    }}
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
                            <span>{(currency.balance || 0).toFixed(8)}</span>
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
          </div>

          {/* Right side with profile/auth */}
          <div className="flex items-center justify-end mr-16" style={{ width: "400px" }}>
            {isLoggedIn && (
              <>
                {hasActiveMatch && (
                  <div className="relative mr-4">
                    <button
                      onClick={() => {/* Navigering til aktiv kamp */}}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg 
                                bg-[#1f2236] border border-[#494e6b] hover:bg-[#2e3354]/50 
                                transition-all animate-pulse"
                    >
                      <PlayCircleIcon className="w-5 h-5 text-[#00e7ff]" />
                      <span className="text-[#00e7ff] font-medium text-sm">
                        Active Match
                      </span>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00e7ff] 
                                    rounded-full animate-ping" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00e7ff] 
                                    rounded-full" />
                    </button>
                  </div>
                )}
                <div className="relative mr-4">
                  <button
                    onClick={toggleNotifications}
                    className="flex items-center p-2 rounded-full hover:bg-[#2e3354]/50 transition-all"
                  >
                    {hasUnread ? (
                      <BellAlertIcon className="w-8 h-8 text-[#00e7ff]" />
                    ) : (
                      <BellIcon className="w-8 h-8 text-[#86d9f9]" />
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute top-full mt-2 right-0 w-96 bg-[#2e3354] border border-[#494e6b] 
                                  rounded-md shadow-lg overflow-hidden" style={{ zIndex: 35 }}>
                      <div className="p-3 border-b border-[#494e6b] bg-[#1f2236]">
                        <h3 className="text-[#00e7ff] font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-[#494e6b] hover:bg-[#3c4263] cursor-pointer
                                      ${notification.unread ? 'bg-[#1f2236]' : ''}`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="text-[#00e7ff] font-medium text-sm">
                                {notification.title}
                              </h4>
                              <span className="text-[#86d9f9]/50 text-xs">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-[#c3c8f3] text-sm">
                              {notification.message}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-[#494e6b] bg-[#1f2236]">
                        <button className="w-full text-center text-[#00e7ff] text-sm hover:underline">
                          Mark all as read
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center p-2 rounded-full hover:bg-[#2e3354]/50 transition-all"
                  >
                    <UserCircleIcon className="w-8 h-8 text-[#86d9f9]" />
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
              </>
            )}
            {/* Existing login/register buttons for non-logged in users */}
          </div>
        </div>

        {/* Glowing line under header */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#00e7ff] to-[#0077ff] 
          shadow-[0_0_8px_rgba(0,231,255,0.8)]" />
      </header>

      {showWalletPopup && <WalletPopup onClose={toggleWalletPopup} />}
    </>
  );
}