"use client";

import Games from "../games";
import { matchesData, tournamentsData } from "../fortnitedata";

export default function Fortnite() {
  return (
    <Games
      gameId="Fortnite"
      gameImage="/images/games/fortnite.jpg"
      matches={matchesData}
      tournaments={tournamentsData}
    />
  );
}
