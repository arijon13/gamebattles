"use client";

import React, { useState } from "react";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import Buy from "./buy";

interface WalletPopupProps {
  onClose: () => void;
}

const WalletPopup: React.FC<WalletPopupProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw" | "buy">(
    "deposit"
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-b from-[#1a1d31] to-[#2e3354] border border-[#4b86e1] rounded-xl w-[90%] max-w-lg h-[750px] shadow-2xl relative">
        {/* Top Section */}
        <div className="bg-gradient-to-r from-[#2e3354] to-[#1a1d31] p-6 rounded-t-lg relative shadow-md">
          <h3 className="text-cyan-400 text-base font-semibold absolute top-4 left-6 tracking-wide">
            Cashier
          </h3>
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-gray-400 hover:text-cyan-300 transition-colors text-lg"
          >
            ✖
          </button>
          <div className="flex justify-between items-center pt-8 pb-3">
            <button
              onClick={() => setActiveTab("deposit")}
              className={`text-base w-1/3 text-center font-semibold transition-colors ${
                activeTab === "deposit"
                  ? "text-cyan-400"
                  : "text-gray-400 hover:text-cyan-300"
              }`}
            >
              Deposit
              {activeTab === "deposit" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("withdraw")}
              className={`text-base w-1/3 text-center font-semibold transition-colors ${
                activeTab === "withdraw"
                  ? "text-cyan-400"
                  : "text-gray-400 hover:text-cyan-300"
              }`}
            >
              Withdraw
              {activeTab === "withdraw" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("buy")}
              className={`text-base w-1/3 text-center font-semibold transition-colors ${
                activeTab === "buy"
                  ? "text-cyan-400"
                  : "text-gray-400 hover:text-cyan-300"
              }`}
            >
              Buy
              {activeTab === "buy" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400"></span>
              )}
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 overflow-y-auto h-[calc(100%-130px)] bg-gradient-to-b from-[#1a1d31] to-[#10132b] rounded-b-lg shadow-inner">
          {activeTab === "deposit" && <Deposit />}
          {activeTab === "withdraw" && <Withdraw />}
          {activeTab === "buy" && <Buy />}
        </div>
      </div>
    </div>
  );
};

export default WalletPopup;
