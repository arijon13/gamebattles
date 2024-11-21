"use client";

import React, { useState } from "react";

const coins = [
  { name: "BTC", label: "Bitcoin", icon: "/images/coins/btc.png" },
  { name: "ETH", label: "Ethereum", icon: "/images/coins/eth.png" },
  { name: "USDT", label: "Tether", icon: "/images/coins/usdt.png" },
];

const Withdraw: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>("BTC"); // Default to BTC
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  return (
    <div>
      {/* Coin Selection Dropdown */}
      <div className="relative mb-6">
        <button
          className="w-full flex items-center justify-between bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600"
          onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
        >
          <div className="flex items-center space-x-2">
            <img
              src={coins.find((coin) => coin.name === selectedCoin)?.icon}
              alt={selectedCoin}
              className="w-6 h-6"
            />
            <span>{coins.find((coin) => coin.name === selectedCoin)?.label}</span>
          </div>
          <span>▼</span>
        </button>

        {/* Dropdown Options */}
        {showDropdown && (
          <div className="absolute top-full mt-2 w-full bg-gray-700 rounded-lg shadow-lg">
            {coins
              .filter((coin) => coin.name !== selectedCoin) // Exclude the selected coin
              .map((coin) => (
                <button
                  key={coin.name}
                  onClick={() => {
                    setSelectedCoin(coin.name); // Update selected coin
                    setShowDropdown(false); // Close dropdown
                  }}
                  className="flex items-center justify-between px-4 py-2 w-full text-left hover:bg-[#4b86e1] text-gray-300 hover:text-white"
                >
                  <div className="flex items-center space-x-2">
                    <img src={coin.icon} alt={coin.label} className="w-6 h-6" />
                    <span>{coin.label}</span>
                  </div>
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Withdraw To Section */}
      <div className="mb-6">
        <h4 className="text-gray-300 text-sm mb-2">Withdraw To</h4>
        <input
          type="text"
          placeholder="Your BTC Address"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500"
        />
      </div>

      {/* Withdraw Amount Section */}
      <div className="mb-6">
        <h4 className="text-gray-300 text-sm mb-2">Withdraw Amount</h4>
        <input
          type="number"
          placeholder="Enter Amount to Withdraw"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500"
        />
        <p className="text-xs text-gray-400 mt-2">
          Minimum withdrawal amount is $10.00
        </p>
      </div>

      {/* Withdraw Button */}
      <button className="w-full px-4 py-2 bg-[#4b86e1] text-white rounded-lg hover:bg-[#3a6bcf]">
        Withdraw
      </button>
    </div>
  );
};

export default Withdraw;
