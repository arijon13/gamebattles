"use client";

import Games from '../games';
import { fortniteData } from '../fortnitedata';

export default function FortnitePage() {
  return (
    <Games
      gameId="fortnite"
      gameImage={fortniteData.gameImage} // Header-bildet
      matches={fortniteData.matches} // Matchdata
      tournaments={fortniteData.tournaments} // Turneringer
      criteria={fortniteData.criteria} // Filtreringskriterier
    />
  );
}
