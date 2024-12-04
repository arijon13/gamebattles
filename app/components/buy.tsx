"use client";

import React, { useState } from "react";

interface BuyProps {
  onSuccess: () => Promise<void>;
}

const coins = [
  { name: "BTC", label: "Bitcoin", icon: "/images/coins/btc.png" },
  { name: "ETH", label: "Ethereum", icon: "/images/coins/eth.png" },
  { name: "USDT", label: "Tether", icon: "/images/coins/usdt.png" },
];

const Buy: React.FC<BuyProps> = ({ onSuccess }) => {
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
    <div className="p-6 bg-gradient-to-b from-[#1a1d31] to-[#10132b] rounded-lg shadow-md font-exo">
      <h4 className="text-[#d7e0fc] text-lg mb-4 font-bold tracking-wide">
        Don’t have crypto?
      </h4>
      <p className="text-[#a5b3e5] text-sm mb-4 leading-relaxed">
        Complete these simple steps and funds will automatically be transferred
        to your selected wallet, shown below.
      </p>

      {/* Coin Selection Dropdown */}
      <div className="relative mb-6">
        <button
          className="w-full flex items-center justify-between bg-[#2e3354] text-[#c3c8f3] px-4 py-3 rounded-lg hover:bg-[#3c4263] transition-all"
          onClick={toggleDropdown}
        >
          <div className="flex items-center space-x-2">
            <img
              src={coins.find((c) => c.name === selectedCoin)?.icon}
              alt={selectedCoin}
              className="w-6 h-6"
            />
            <span className="font-medium">{selectedCoin}</span>
          </div>
          <span className="text-[#86d9f9] font-bold">▼</span>
        </button>
        {showDropdown && (
          <div className="absolute top-full mt-2 w-full bg-[#2e3354] rounded-lg shadow-lg z-10">
            {coins
              .filter((coin) => coin.name !== selectedCoin)
              .map((coin) => (
                <button
                  key={coin.name}
                  onClick={() => selectCoin(coin.name)}
                  className="flex items-center justify-between px-4 py-3 w-full text-left hover:bg-[#4b86e1] text-[#c3c8f3] hover:text-white transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <img src={coin.icon} alt={coin.label} className="w-6 h-6" />
                    <span className="font-medium">{coin.label}</span>
                  </div>
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Purchase Amount Section */}
      <div className="mb-6">
        <h4 className="text-[#86d9f9] text-sm mb-2 font-bold tracking-wide">
          Purchase Amount
        </h4>
        <input
          type="number"
          placeholder="$10"
          value={purchaseAmount}
          onChange={(e) => setPurchaseAmount(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#2e3354] text-[#c3c8f3] placeholder-[#6672a1] focus:outline-none focus:ring-2 focus:ring-[#4b86e1]"
        />
        <p className="text-xs text-[#a5b3e5] mt-2">
          Minimum purchase amount is $10.
        </p>
      </div>

      {/* Buy Button */}
      <button className="w-full px-4 py-3 bg-gradient-to-r from-[#4b86e1] to-[#73a9f1] text-white rounded-lg hover:opacity-90 shadow-md hover:shadow-lg transition-all font-bold tracking-wide">
        Buy
      </button>
    </div>
  );
};

export default Buy;
