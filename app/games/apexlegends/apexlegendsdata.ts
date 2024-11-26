"use client";

export const apexlegendsMatches = [
  {
    id: 1,
    gameId: "apexlegends",
    image: "/images/games/apex-legends.png",
    entryFee: "$10",
    teamSize: "3v3",
    region: "EU",
    matchType: "Battle Royale"
  }
];

export const apexlegendsTournaments = [
  {
    id: 1,
    image: "/images/games/apex-legends.png",
    entryFee: "$25",
    region: "EU",
    matchType: "Battle Royale",
    enrolled: 20
  }
];

export const apexlegendsCriteria = {
  regions: ["EU", "NA", "ASIA", "OCE"],
  teamSizes: ["1v1", "2v2", "3v3"],
  matchTypes: ["Battle Royale", "Arenas", "Control"],
  showRegion: true
};

export const apexlegendsData = {
  id: "apexlegends",
  gameImage: "/images/games/apex-legends.png",
  matches: apexlegendsMatches,
  tournaments: apexlegendsTournaments,
  criteria: apexlegendsCriteria
}; 