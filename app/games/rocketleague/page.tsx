"use client";

import { useState } from "react";
import CreateMatch from "../creatematch";
import Games from "../games";
import { rocketleagueData, rocketleagueMatches, rocketleagueTournaments } from "./rocketleaguedata";

export default function RocketLeaguePage() {
  return (
    <Games
      gameId="rocketleague"
      gameImage={rocketleagueData.gameImage}
      matches={rocketleagueMatches}
      tournaments={rocketleagueTournaments}
      criteria={rocketleagueData.criteria}
    />
  );
} 