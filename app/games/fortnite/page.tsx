"use client";

import Games from '../games';
import fortniteData from '../fortnitedata';

export default function FortnitePage() {
  return (
    <Games
      gameId="fortnite"
      gameImage={fortniteData.gameImage}
      matches={fortniteData.matches}
      tournaments={fortniteData.tournaments}
      criteria={fortniteData.criteria} // Sender kriterier for filtrering
    />
  );
}
