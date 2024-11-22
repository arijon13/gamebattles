"use client";

export interface Tournament {
  id: number;
  entryFee: string;
  region: string;
  matchType: string; // Updated from fightType
}

interface TournamentsProps {
  tournaments: Tournament[];
}

export default function Tournaments({ tournaments }: TournamentsProps) {
  return (
    <div className="bg-[#1f2236] p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Available Tournaments</h2>
      <ul className="space-y-4">
        {tournaments.map((tournament) => (
          <li key={tournament.id} className="flex items-center justify-between bg-[#292d3e] p-4 rounded-md shadow-md">
            <div className="flex-1 text-white">
              <p>Entry Fee: {tournament.entryFee}</p>
              <p>Region: {tournament.region}</p>
              <p>Match Type: {tournament.matchType}</p>
            </div>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md">Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
