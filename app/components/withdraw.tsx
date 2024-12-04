"use client";

import React, { useState } from "react";

interface WithdrawProps {
  onSuccess: () => Promise<void>;
}

const coins = [
  { name: "BTC", label: "Bitcoin", icon: "/images/coins/btc.png" },
  { name: "ETH", label: "Ethereum", icon: "/images/coins/eth.png" },
  { name: "USDT", label: "Tether", icon: "/images/coins/usdt.png" },
];

const Withdraw: React.FC<WithdrawProps> = ({ onSuccess }) => {
  const [selectedCoin, setSelectedCoin] = useState<string>("BTC"); // Default to BTC
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [withdrawAmount, setWithdrawAmount] = useState<string>(""); // Initial value as an empty string

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawAmount(e.target.value || ""); // Ensure value is never undefined
  };

  return (
    <div className="p-6 bg-gradient-to-b from-[#1a1d31] to-[#10132b] rounded-lg shadow-md">
      {/* Coin Selection Section */}
      <h2 className="text-xl font-bold text-center text-cyan-300 mb-6">
        Withdraw Cryptocurrency
      </h2>
      <div className="relative mb-6">
        <button
          className="w-full flex items-center justify-between bg-[#2e3354] text-[#c3c8f3] px-4 py-3 rounded-lg hover:bg-[#3c4263] transition-all"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="flex items-center space-x-3">
            <img
              src={coins.find((c) => c.name === selectedCoin)?.icon}
              alt={selectedCoin}
              className="w-6 h-6"
            />
            <span>{coins.find((c) => c.name === selectedCoin)?.label}</span>
          </div>
          <span className="text-[#86d9f9]">▼</span>
        </button>
        {showDropdown && (
          <div className="absolute top-full mt-2 w-full bg-[#2e3354] rounded-lg shadow-lg z-50">
            {coins
              .filter((coin) => coin.name !== selectedCoin)
              .map((coin) => (
                <button
                  key={coin.name}
                  onClick={() => {
                    setSelectedCoin(coin.name);
                    setShowDropdown(false);
                  }}
                  className="flex items-center justify-between px-4 py-3 w-full text-left hover:bg-[#3c4263] transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <img src={coin.icon} alt={coin.label} className="w-6 h-6" />
                    <span className="text-[#c3c8f3]">{coin.label}</span>
                  </div>
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Withdraw To Section */}
      <div className="mb-6">
        <h4 className="text-[#86d9f9] text-sm mb-2">Withdraw To</h4>
        <input
          type="text"
          placeholder={`Your ${selectedCoin} Address`}
          className="w-full px-4 py-3 rounded-lg bg-[#2e3354] text-[#c3c8f3] placeholder-[#6672a1] shadow-md focus:outline-none focus:ring-2 focus:ring-[#4b86e1]"
        />
      </div>

      {/* Withdraw Amount Section */}
      <div className="mb-6">
        <h4 className="text-[#86d9f9] text-sm mb-2">Withdraw Amount</h4>
        <input
          type="number"
          placeholder="Enter Amount to Withdraw"
          value={withdrawAmount}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg bg-[#2e3354] text-[#c3c8f3] placeholder-[#6672a1] shadow-md focus:outline-none focus:ring-2 focus:ring-[#4b86e1]"
        />
        <p className="text-xs text-[#86d9f9] mt-2">
          Minimum withdrawal amount is $10.00
        </p>
      </div>

      {/* Withdraw Button */}
      <button className="w-full px-4 py-3 bg-[#4b86e1] text-white rounded-lg shadow-md hover:bg-[#3a6bcf] transition-all">
        Withdraw
      </button>
    </div>
  );
};

export default Withdraw;
