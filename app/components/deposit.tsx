"use client";

import React, { useState } from "react";
import CoinSelection from "./coinselection";

const coins = [
  { name: "BTC", label: "Bitcoin", icon: "/images/coins/btc.png" },
  { name: "ETH", label: "Ethereum", icon: "/images/coins/eth.png" },
  { name: "USDT", label: "Tether", icon: "/images/coins/usdt.png" },
];

const address = "1BitcoinAddressExample1234567890";

const Deposit: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  return (
    <div>
      {!selectedCoin ? (
        <CoinSelection
          coins={coins}
          selectedCoin={selectedCoin}
          onSelect={setSelectedCoin}
        />
      ) : (
        <div>
          {/* Dropdown for Coin Selection */}
          <div className="relative mb-6">
            <button
              className="w-full flex items-center justify-between bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600"
              onClick={() => setSelectedCoin(null)}
            >
              <div className="flex items-center space-x-2">
                <img
                  src={coins.find((c) => c.name === selectedCoin)?.icon}
                  alt={selectedCoin || ""}
                  className="w-6 h-6"
                />
                <span>{selectedCoin}</span>
              </div>
              <span>▼</span>
            </button>
          </div>

          {/* QR Code and Address */}
          <div className="flex items-start space-x-6 mb-6">
            {/* QR Code Placeholder */}
            <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">QR</span>
            </div>

            {/* Address Details */}
            <div className="text-gray-300">
              <h4 className="text-sm text-gray-400 mb-2">Your Address</h4>
              <p className="text-xs bg-gray-800 px-4 py-2 rounded-lg">
                {address}
              </p>
              <div className="flex space-x-2 mt-2">
                <button className="text-xs px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                  Request New Address
                </button>
                <button className="text-xs px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                  Copy Address
                </button>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <p className="text-base text-[#4b86e1] mt-4">
            Having trouble depositing?
          </p>
        </div>
      )}
    </div>
  );
};

export default Deposit;
