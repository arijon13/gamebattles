"use client";

export const fifaMatches = [
  {
    id: 1,
    image: "/images/games/fc.jpg",
    entryFee: "$5",
    teamSize: "1v1",
    region: "EU",
    matchType: "Standard",
  },
  {
    id: 2,
    image: "/images/games/fc.jpg",
    entryFee: "$10",
    teamSize: "Pro Clubs",
    region: "NA",
    matchType: "Knockout",
  },
];

export const fifaTournaments = [
  {
    id: 1,
    image: "/images/games/fc.jpg", // Legger til bilde
    entryFee: "$15",
    region: "EU",
    matchType: "Knockout",
    enrolled: 20, // Totalt antall spillere/teams påmeldt
  },
  {
    id: 2,
    image: "/images/games/fc.jpg", // Legger til bilde
    entryFee: "$20",
    region: "ASIA",
    matchType: "Round Robin",
    enrolled: 32, // Totalt antall spillere/teams påmeldt
  },
];

export const fifaCriteria = {
  regions: ["EU", "NA", "ASIA", "SA"],
  teamSizes: ["1v1", "Pro Clubs"],
  matchTypes: ["Standard", "Knockout", "Round Robin"],
};

export const fifaData = {
  gameImage: "/images/games/fc.jpg", // Legger til header-bilde
  matches: fifaMatches,
  tournaments: fifaTournaments,
  criteria: fifaCriteria,
};
