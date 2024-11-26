"use client";

import { useState } from "react";
import CreateMatch from "./creatematch";
import { Match } from "./matches";
import { fifaData } from "./fifa/fifadata";
import { fortniteData } from "./fortnite/fortnitedata";
import MatchCard from "./MatchCard";

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [isCreateMatchOpen, setIsCreateMatchOpen] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);

  const getGameData = (gameId: string | null) => {
    if (!gameId) return null;
    
    switch (gameId) {
      case 'fifa':
        return fifaData;
      case 'fortnite':
        return fortniteData;
      default:
        return null;
    }
  };

  const handleCreateMatch = (newMatch: Match) => {
    setMatches(prev => [...prev, newMatch]);
    setIsCreateMatchOpen(false);
  };

  const selectedGameData = getGameData(selectedGame);

  return (
    <div>
      {isCreateMatchOpen && selectedGameData && (
        <CreateMatch 
          onCreate={handleCreateMatch}
          isOpen={isCreateMatchOpen}
          onClose={() => setIsCreateMatchOpen(false)}
          gameImage={selectedGameData.gameImage}
          gameId={selectedGameData.id}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {matches
          .filter(match => match.gameId === selectedGame)
          .map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
      </div>
    </div>
  );
}