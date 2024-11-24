"use client";

import React, { useState } from "react";

const coins = [
  { name: "BTC", label: "Bitcoin", icon: "/images/coins/btc.png" },
  { name: "ETH", label: "Ethereum", icon: "/images/coins/eth.png" },
  { name: "USDT", label: "Tether", icon: "/images/coins/usdt.png" },
  { name: "LTC", label: "Litecoin", icon: "/images/coins/ltc.png" },
  { name: "DOGE", label: "Dogecoin", icon: "/images/coins/doge.png" },
  { name: "ADA", label: "Cardano", icon: "/images/coins/ada.png" },
  { name: "DOT", label: "Polkadot", icon: "/images/coins/dot.png" },
  { name: "SOL", label: "Solana", icon: "/images/coins/sol.png" },
  { name: "BNB", label: "Binance", icon: "/images/coins/bnb.png" },
];

const address = "1BitcoinAddressExample1234567890";

const Deposit: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  return (
    <div className="p-6 bg-gradient-to-b from-[#1a1d31] to-[#10132b] rounded-lg shadow-md">
      {!selectedCoin ? (
        <div>
          <h2 className="text-xl font-bold text-center text-cyan-300 mb-6">
            Select Your Cryptocurrency
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {coins.map((coin) => (
              <button
                key={coin.name}
                onClick={() => setSelectedCoin(coin.name)}
                className="flex flex-col items-center justify-center h-24 bg-[#2e3354] rounded-lg shadow-md hover:scale-105 hover:bg-[#3c4263] transition-all"
              >
                <img
                  src={coin.icon}
                  alt={coin.label}
                  className="w-10 h-10 mb-2"
                />
                <span className="text-xs text-[#c3c8f3] font-medium">
                  {coin.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Dropdown for Coin Selection */}
          <div className="relative mb-6">
            <button
              className="w-full flex items-center justify-between bg-[#2e3354] text-[#c3c8f3] px-4 py-3 rounded-lg hover:bg-[#3c4263] transition-all"
              onClick={() => setSelectedCoin(null)}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={coins.find((c) => c.name === selectedCoin)?.icon}
                  alt={selectedCoin || ""}
                  className="w-6 h-6"
                />
                <span>{selectedCoin}</span>
              </div>
              <span className="text-[#86d9f9]">▼</span>
            </button>
          </div>

          {/* QR Code and Address */}
          <div className="flex items-start space-x-6 mb-6">
            {/* QR Code Placeholder */}
            <div className="w-32 h-32 bg-[#2e3354] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-[#86d9f9] font-semibold">QR</span>
            </div>

            {/* Address Details */}
            <div className="text-[#c3c8f3]">
              <h4 className="text-sm text-[#86d9f9] mb-2">Your Address</h4>
              <p className="text-xs bg-[#2e3354] px-4 py-2 rounded-lg shadow-md">
                {address}
              </p>
              <div className="flex space-x-4 mt-2">
                <button className="text-xs px-4 py-2 bg-[#4b86e1] text-white rounded-lg hover:bg-[#3c4263] shadow-md transition-all">
                  Request New Address
                </button>
                <button className="text-xs px-4 py-2 bg-[#4b86e1] text-white rounded-lg hover:bg-[#3c4263] shadow-md transition-all">
                  Copy Address
                </button>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <p className="text-sm text-[#4b86e1] mt-4 hover:underline cursor-pointer text-center">
            Having trouble depositing?
          </p>
        </div>
      )}
    </div>
  );
};

export default Deposit;
