"use client";

import Games from '../games';
import { fifaMatches, fifaTournaments, fifaCriteria } from './fifadata';

export default function FIFA() {
  return (
    <Games
      gameId="fifa"
      gameImage="/images/games/fc.jpg" // Bildet for FIFA
      matches={fifaMatches} // FIFA-spesifikke matcher
      tournaments={fifaTournaments} // FIFA-spesifikke turneringer
      criteria={fifaCriteria} // FIFA-spesifikke kriterier
    />
  );
}
