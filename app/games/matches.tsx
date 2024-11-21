"use client";

interface Match {
  id: number;
  image: string;
  entryFee: string;
  teamSize: string;
  region: string;
  fightType: string;
}

interface MatchesProps {
  matches: Match[];
}

export default function Matches({ matches }: MatchesProps) {
  return (
    <div className="bg-[#1f2236] p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Available Matches</h2>
      <ul className="space-y-4">
        {matches.map((match) => (
          <li
            key={match.id}
            className="flex items-center justify-between bg-[#292d3e] p-4 rounded-md shadow-md"
          >
            <img
              src={match.image}
              alt="Match Thumbnail"
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="flex-1 ml-4 text-white">
              <p>Entry Fee: {match.entryFee}</p>
              <p>Team Size: {match.teamSize}</p>
              <p>Region: {match.region}</p>
              <p>Fight Type: {match.fightType}</p>
            </div>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md">Accept</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
