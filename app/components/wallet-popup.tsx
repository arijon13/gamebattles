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
      <div className="bg-[#2e3354] border-2 border-black rounded-lg w-[90%] max-w-lg h-[750px] shadow-lg relative">
        {/* Top Section */}
        <div className="bg-black p-6 rounded-t-lg relative">
          <h3 className="text-gray-400 text-sm absolute top-4 left-6">
            Cashier
          </h3>
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-gray-400 text-sm hover:text-gray-200 transition"
          >
            ✖
          </button>
          <div className="flex justify-between items-center pt-8 pb-3">
            <button
              onClick={() => setActiveTab("deposit")}
              className={`text-white text-base w-1/3 text-center relative ${
                activeTab === "deposit" ? "text-[#4b86e1]" : ""
              }`}
            >
              Deposit
              {activeTab === "deposit" && (
                <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[#4b86e1]"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("withdraw")}
              className={`text-white text-base w-1/3 text-center relative ${
                activeTab === "withdraw" ? "text-[#4b86e1]" : ""
              }`}
            >
              Withdraw
              {activeTab === "withdraw" && (
                <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[#4b86e1]"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("buy")}
              className={`text-white text-base w-1/3 text-center relative ${
                activeTab === "buy" ? "text-[#4b86e1]" : ""
              }`}
            >
              Buy
              {activeTab === "buy" && (
                <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-[#4b86e1]"></span>
              )}
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 overflow-y-auto h-[calc(100%-130px)]">
          {activeTab === "deposit" && <Deposit />}
          {activeTab === "withdraw" && <Withdraw />}
          {activeTab === "buy" && <Buy />}
        </div>
      </div>
    </div>
  );
};

export default WalletPopup;
