import { Match } from "./matches";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="bg-gradient-to-b from-[#1f2236] to-[#292d3e] p-4 rounded-xl shadow-lg">
      <img 
        src={match.image} 
        alt="Game" 
        className="w-full h-32 object-cover rounded-lg mb-4"
      />
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-white font-bold">Entry Fee:</span>
          <span className="text-cyan-400">{match.entryFee}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white font-bold">Team Size:</span>
          <span className="text-cyan-400">{match.teamSize}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white font-bold">Region:</span>
          <span className="text-cyan-400">{match.region}</span>
        </div>
      </div>
    </div>
  );
} 