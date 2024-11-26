"use client";

import { useState } from "react";
import CreateMatch from "../creatematch";
import Games from "../games";
import { apexlegendsData, apexlegendsMatches, apexlegendsTournaments } from "./apexlegendsdata";

export default function ApexLegendsPage() {
  return (
    <Games
      gameId="apexlegends"
      gameImage={apexlegendsData.gameImage}
      matches={apexlegendsMatches}
      tournaments={apexlegendsTournaments}
      criteria={apexlegendsData.criteria}
    />
  );
}
