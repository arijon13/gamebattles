"use client";

export interface Match {
  id: number;
  image: string; // URL til bildet
  entryFee: string;
  teamSize: string;
  region: string;
  matchType: string; // Endret fra fightType
}

interface MatchesProps {
  matches: Match[];
}

export default function Matches({ matches }: MatchesProps) {
  const hasMatchType = matches.some((match) => match.matchType !== undefined);

  return (
    <div className="bg-gradient-to-b from-[#1f2236] to-[#292d3e] p-8 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wider">
        Available Matches
      </h2>

      {/* Wrapper med fjernet scrollbar */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-white bg-[#1f2236] rounded-lg border-separate border-spacing-0">
          <thead>
            <tr className="bg-gradient-to-r from-[#2a2f48] to-[#1f2236] text-sm uppercase text-gray-400">
              <th className="p-4 text-center">Match</th>
              <th className="p-4 text-center">Entry Fee</th>
              <th className="p-4 text-center">Team Size</th>
              <th className="p-4 text-center">Region</th>
              {hasMatchType && <th className="p-4 text-center">Match Type</th>}
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr
                key={match.id}
                className={`${
                  index % 2 === 0 ? "bg-[#1f2236]" : "bg-[#292d3e]"
                } hover:scale-[1.02] transition-transform duration-200 shadow-md`}
              >
                <td className="p-4 text-center">
                  <div className="flex flex-col items-center">
                    <img
                      src={match.image}
                      alt="Match Thumbnail"
                      className="w-16 h-16 rounded-lg object-cover border-2 border-[#3e445c] shadow-lg mb-2"
                    />
                  </div>
                </td>
                <td className="p-4 text-center font-semibold text-cyan-400">
                  {match.entryFee}
                </td>
                <td className="p-4 text-center font-semibold">{match.teamSize}</td>
                <td className="p-4 text-center font-semibold">{match.region}</td>
                {hasMatchType && (
                  <td className="p-4 text-center font-semibold">
                    {match.matchType || "N/A"}
                  </td>
                )}
                <td className="p-4 text-center">
                  <button className="px-6 py-2 text-sm font-bold text-white rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:opacity-90 shadow-md hover:shadow-lg hover:scale-105 transition-transform">
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
