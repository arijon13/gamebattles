"use client";

import { useState } from 'react';
import { useAuth } from '../authcontext';

interface WalletAddress {
  address: string;
  label: string;
  created: Date;
  lastUsed?: Date;
}

interface StakingPosition {
  amount: number;
  startDate: Date;
  endDate: Date;
  reward: number;
  status: 'active' | 'completed' | 'withdrawn';
}

interface User {
  depositAddresses: WalletAddress[];
  stakedBalance: number;
  stakingPositions: StakingPosition[];
}

export const WalletManager = () => {
  const [newLabel, setNewLabel] = useState('');
  const { user, generateNewAddress } = useAuth();

  const handleNewAddress = async () => {
    try {
      await generateNewAddress(newLabel);
      setNewLabel('');
    } catch (error) {
      console.error('Failed to generate address:', error);
    }
  };

  return (
    <div className="wallet-manager">
      <h2>Your Deposit Addresses</h2>
      
      <div className="addresses-list">
        {user?.depositAddresses?.map((addr: WalletAddress, i: number) => (
          <div key={i} className="address-item">
            <div className="label">{addr.label}</div>
            <div className="address">{addr.address}</div>
            <div className="created">Created: {new Date(addr.created).toLocaleDateString()}</div>
          </div>
        ))}
      </div>

      <div className="new-address-form">
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Address Label (e.g., Gaming)"
        />
        <button onClick={handleNewAddress}>
          Generate New Address
        </button>
      </div>

      <div className="staking-section">
        <h3>Staking</h3>
        <div className="staking-info">
          <div>Staked Balance: {user?.stakedBalance} BTC</div>
          <div>Active Positions: {
            user?.stakingPositions?.filter((p: StakingPosition) => p.status === 'active').length
          }</div>
        </div>
      </div>
    </div>
  );
}; 