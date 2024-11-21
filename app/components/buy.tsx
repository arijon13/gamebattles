"use client";

import React, { useState } from "react";

const coins = [
  { name: "BTC", label: "Bitcoin", icon: "/images/coins/btc.png" },
  { name: "ETH", label: "Ethereum", icon: "/images/coins/eth.png" },
  { name: "USDT", label: "Tether", icon: "/images/coins/usdt.png" },
];

const Buy: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>("BTC");
  const [purchaseAmount, setPurchaseAmount] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectCoin = (coin: string) => {
    setSelectedCoin(coin);
    setShowDropdown(false);
  };

  return (
    <div>
      <h4 className="text-gray-300 text-sm mb-4">Don’t have crypto?</h4>
      <p className="text-gray-400 text-xs mb-4">
        Complete these simple steps and funds will automatically be transferred
        to your selected wallet, shown below.
      </p>

      {/* Coin Selection Dropdown */}
      <div className="relative mb-6">
        <button
          className="w-full flex items-center justify-between bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600"
          onClick={toggleDropdown}
        >
          <div className="flex items-center space-x-2">
            <img
              src={coins.find((c) => c.name === selectedCoin)?.icon}
              alt={selectedCoin}
              className="w-6 h-6"
            />
            <span>{selectedCoin}</span>
          </div>
          <span>▼</span>
        </button>
        {showDropdown && (
          <div className="absolute top-full mt-2 w-full bg-gray-700 rounded-lg shadow-lg">
            {coins
              .filter((coin) => coin.name !== selectedCoin)
              .map((coin) => (
                <button
                  key={coin.name}
                  onClick={() => selectCoin(coin.name)}
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

      {/* Purchase Amount Section */}
      <div className="mb-6">
        <h4 className="text-gray-300 text-sm mb-2">Purchase Amount</h4>
        <input
          type="number"
          placeholder="$10"
          value={purchaseAmount}
          onChange={(e) => setPurchaseAmount(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500"
        />
        <p className="text-xs text-gray-400 mt-2">
          Minimum purchase amount is $10.
        </p>
      </div>

      {/* Buy Button */}
      <button className="w-full px-4 py-2 bg-[#4b86e1] text-white rounded-lg hover:bg-[#3b76c1] transition">
        Buy
      </button>
    </div>
  );
};

export default Buy;
