"use client";

import React from "react";

interface Coin {
  name: string;
  label: string;
  icon: string;
}

interface CoinSelectionProps {
  coins: Coin[];
  selectedCoin: string | null;
  onSelect: (coinName: string) => void;
}

const CoinSelection: React.FC<CoinSelectionProps> = ({
  coins,
  selectedCoin,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-3 gap-3 justify-items-center mb-6">
      {coins.map((coin) => (
        <button
          key={coin.name}
          onClick={() => onSelect(coin.name)}
          className={`flex flex-col items-center justify-center w-36 h-36 rounded-lg ${
            selectedCoin === coin.name
              ? "bg-[#4b86e1] text-white"
              : "bg-gray-700 text-gray-300"
          } hover:bg-[#4b86e1] hover:text-white transition`}
        >
          <img src={coin.icon} alt={coin.label} className="w-16 h-16 mb-2" />
          <span className="text-lg">{coin.name}</span>
          <span className="text-xs text-gray-400">{coin.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CoinSelection;
