"use client";

import { useState } from "react";

export default function FortnitePage() {
  const [wagerAmount, setWagerAmount] = useState(5); // Standard innsats
  const [customWager, setCustomWager] = useState("");
  const [invitations, setInvitations] = useState([
    { id: 1, player: "Player123", amount: 15 },
    { id: 2, player: "Player456", amount: 25 },
    { id: 3, player: "Player789", amount: 40 },
  ]); // Eksempel på invitasjoner

  const handleWagerChange = (amount: number) => {
    setWagerAmount(amount);
    setCustomWager(""); // Tilbakestill egendefinert innsats når et standardbeløp velges
  };

  const handleCustomWagerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomWager(event.target.value);
    setWagerAmount(Number(event.target.value) || 0); // Oppdater innsatsen med egendefinert beløp
  };

  const findMatch = () => {
    alert(`Søker etter en motstander for Fortnite med innsats: $${wagerAmount}`);
    // Her kan vi senere implementere matchmaking-logikk
  };

  const acceptInvitation = (id: number) => {
    alert(`Aksepterte invitasjon til kamp med innsats: $${invitations.find((inv) => inv.id === id)?.amount}`);
    // Her kan vi senere implementere logikk for å bli med i kampen
  };

  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">Fortnite</h1>
      <p className="text-lg mb-8">Velg innsatsbeløp og start kampen!</p>

      {/* Innsatsvalg */}
      <div className="flex space-x-4 mb-6">
        {[5, 20, 50].map((amount) => (
          <button
            key={amount}
            onClick={() => handleWagerChange(amount)}
            className={`px-4 py-2 rounded-md shadow-md ${
              wagerAmount === amount
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
            } transition duration-300`}
          >
            ${amount}
          </button>
        ))}
        <input
          type="number"
          placeholder="Custom"
          value={customWager}
          onChange={handleCustomWagerChange}
          className="w-24 px-4 py-2 text-gray-900 rounded-md"
        />
      </div>

      {/* Start Match Button */}
      <button
        onClick={findMatch}
        className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500 transition duration-300"
      >
        Start Match
      </button>

      {/* Invitasjoner for egendefinerte matcher */}
      {customWager && (
        <div className="mt-10 w-80 bg-gray-800 rounded-md shadow-lg p-4">
          <h3 className="text-xl font-bold text-blue-400 mb-4">Invitasjoner</h3>
          <ul>
            {invitations.map((invitation) => (
              <li
                key={invitation.id}
                className="flex justify-between items-center bg-gray-700 rounded-md mb-3 p-3"
              >
                <span>
                  {invitation.player} - ${invitation.amount}
                </span>
                <button
                  onClick={() => acceptInvitation(invitation.id)}
                  className="text-sm bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-500 transition-all"
                >
                  Aksepter
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
