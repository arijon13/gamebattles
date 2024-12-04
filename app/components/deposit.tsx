"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../authcontext";
import { makeDeposit } from '../../src/api';
import { QRCodeSVG } from 'qrcode.react';

// Legg til en type for coin-info
interface CoinInfo {
  name: string;
  label: string;
  icon: string;
  addressLabel: string;
  qrLabel: string;
  comingSoon?: boolean;
}

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

const coinConfig: Record<string, CoinInfo> = {
  BTC: {
    name: "BTC",
    label: "Bitcoin",
    icon: "/images/coins/btc.png",
    addressLabel: "Your BTC Address",
    qrLabel: "Bitcoin QR Code"
  },
  ETH: {
    name: "ETH",
    label: "Ethereum",
    icon: "/images/coins/eth.png",
    addressLabel: "Your ETH Address",
    qrLabel: "Ethereum QR Code",
    comingSoon: true
  },
  // ... andre coins
};

interface DepositProps {
  onSuccess: () => Promise<void>;
}

const Deposit: React.FC<DepositProps> = ({ onSuccess }) => {
  const [selectedCoin, setSelectedCoin] = useState<string | null>("BTC");
  const [currentAddress, setCurrentAddress] = useState<string>('');
  const { updateBalance, user, generateNewAddress, token } = useAuth();

  useEffect(() => {
    if (selectedCoin && user?.depositAddresses) {
      console.log('Selected coin:', selectedCoin);
      console.log('User deposit addresses:', user.depositAddresses);
      const address = user.depositAddresses.find(a => a.label === selectedCoin);
      if (address) {
        console.log('Found address:', address);
        setCurrentAddress(address.address);
      } else {
        console.log('No address found for coin:', selectedCoin);
      }
    }
  }, [selectedCoin, user]);

  const handleNewAddress = async () => {
    console.log('Generate New Address clicked');
    try {
      if (!token) {
        console.log('No token available');
        return;
      }

      if (selectedCoin !== 'BTC') {
        console.log('Only BTC is supported at the moment');
        alert('Only Bitcoin deposits are supported at the moment');
        return;
      }

      const url = 'http://localhost:5000/api/wallet/addresses/new';
      console.log('Making request to:', url);
      console.log('Selected coin:', selectedCoin);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          label: selectedCoin 
        })
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success response:', data);
      
      if (data.address) {
        setCurrentAddress(data.address);
        console.log('Address updated to:', data.address);
      }
    } catch (error) {
      console.error('Failed to generate new address:', error);
      // Vis feilmelding til brukeren her hvis ønskelig
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentAddress);
  };

  const handleDeposit = async () => {
    try {
      const amount = 0;
      const currency = selectedCoin || 'BTC';
      
      await makeDeposit(amount, currency);
      
      if (onSuccess) {
        await onSuccess();
      }
    } catch (error) {
      console.error('Deposit failed:', error);
    }
  };

  // QR Code rendering
  const renderQRCode = () => {
    if (currentAddress) {
      console.log('Rendering QR for address:', currentAddress);
      return (
        <QRCodeSVG 
          value={currentAddress}
          size={112}
          bgColor="#2e3354"
          fgColor="#86d9f9"
        />
      );
    }
    console.log('No address available for QR');
    return <span className="text-[#86d9f9] font-semibold">QR</span>;
  };

  // Legg til en useEffect for å logge når currentAddress endres
  useEffect(() => {
    console.log('Current address updated:', currentAddress);
  }, [currentAddress]);

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
                  alt={selectedCoin}
                  className="w-6 h-6"
                />
                <span>{selectedCoin}</span>
              </div>
              <span className="text-[#86d9f9]">▼</span>
            </button>
          </div>

          {/* Coin-specific content */}
          {coinConfig[selectedCoin].comingSoon ? (
            <div className="text-center py-4">
              <img
                src={coinConfig[selectedCoin].icon}
                alt={coinConfig[selectedCoin].label}
                className="w-12 h-12 mx-auto mb-3"
              />
              <p className="text-[#86d9f9] font-semibold">
                {coinConfig[selectedCoin].label} deposits coming soon!
              </p>
            </div>
          ) : (
            <div className="flex items-start space-x-6 mb-6">
              <div className="w-32 h-32 bg-[#2e3354] rounded-lg flex items-center justify-center shadow-md">
                {currentAddress ? (
                  <QRCodeSVG 
                    value={currentAddress}
                    size={112}
                    bgColor="#2e3354"
                    fgColor="#86d9f9"
                  />
                ) : (
                  <span className="text-[#86d9f9] font-semibold">QR</span>
                )}
              </div>

              <div className="text-[#c3c8f3]">
                <p className="text-xs bg-[#2e3354] px-4 py-2 rounded-lg shadow-md">
                  {currentAddress || 'No address generated yet'}
                </p>
                <div className="flex space-x-4 mt-2">
                  <button 
                    onClick={handleNewAddress}
                    className="text-xs px-4 py-2 bg-[#4b86e1] text-white rounded-lg hover:bg-[#3c4263] shadow-md transition-all">
                    Generate New Address
                  </button>
                  <button 
                    onClick={() => currentAddress && navigator.clipboard.writeText(currentAddress)}
                    disabled={!currentAddress}
                    className={`text-xs px-4 py-2 ${
                      currentAddress 
                        ? 'bg-[#4b86e1] hover:bg-[#3c4263]' 
                        : 'bg-gray-500 cursor-not-allowed'
                    } text-white rounded-lg shadow-md transition-all`}>
                    Copy Address
                  </button>
                </div>
              </div>
            </div>
          )}

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