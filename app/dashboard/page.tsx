"use client";

import Head from "next/head";
import { useState } from "react";

export default function Dashboard() {
  // Define balances with an index signature to allow string keys
  const balances: Record<string, number> = {
    BTC: 0.05,
    ETH: 1.2,
    USDT: 100.0,
  };

  // Set the initial currency and balance state
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");

  return (
    <>
      <Head>
        <title>GameBattles - Dashboard</title>
        <meta name="description" content="Your crypto dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-blue-900 min-h-screen text-white flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold mb-6">Crypto Dashboard</h1>

        {/* Balance Section */}
        <section className="bg-blue-800 rounded-lg p-6 shadow-lg max-w-lg w-full text-center">
          <h2 className="text-2xl font-semibold mb-4">Current Balance</h2>
          <p className="text-4xl font-bold mb-6">
            {selectedCurrency} {balances[selectedCurrency]}
          </p>

          {/* Currency Selector */}
          <div className="flex justify-center space-x-4 mb-6">
            {Object.keys(balances).map((currency) => (
              <button
                key={currency}
                className={`px-4 py-2 rounded-lg ${
                  selectedCurrency === currency ? "bg-blue-600" : "bg-blue-700"
                } hover:bg-blue-500 transition duration-300`}
                onClick={() => setSelectedCurrency(currency)}
              >
                {currency}
              </button>
            ))}
          </div>

          {/* Deposit and Withdraw buttons */}
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-400 hover:to-green-500 transition duration-300">
              Deposit
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-400 hover:to-red-500 transition duration-300">
              Withdraw
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
