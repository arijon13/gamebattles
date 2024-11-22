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
    entryFee: "$15",
    region: "EU",
    matchType: "Knockout",
  },
  {
    id: 2,
    entryFee: "$20",
    region: "ASIA",
    matchType: "Round Robin",
  },
];

export const fifaCriteria = {
  regions: ["EU", "NA", "ASIA", "SA"],
  teamSizes: ["1v1", "Pro Clubs"],
  matchTypes: ["Standard", "Knockout", "Round Robin"],
};
