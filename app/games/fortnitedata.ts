"use client";

export const fortniteMatches = [
  {
    id: 1,
    image: "/images/games/fortnite.jpg",
    entryFee: "$5",
    teamSize: "1v1",
    region: "EU",
    matchType: "Build Mode",
  },
  {
    id: 2,
    image: "/images/games/fortnite.jpg",
    entryFee: "$10",
    teamSize: "2v2",
    region: "NA",
    matchType: "No Build Mode",
  },
];

export const fortniteTournaments = [
  {
    id: 201,
    image: "/images/games/fortnite.jpg",
    entryFee: "$20",
    region: "EU",
    matchType: "Knockout",
    enrolled: 16,
  },
  {
    id: 202,
    image: "/images/games/fortnite.jpg",
    entryFee: "$25",
    region: "NA",
    matchType: "Round Robin",
    enrolled: 12,
  },
  {
    id: 203,
    image: "/images/games/fortnite.jpg",
    entryFee: "Free",
    region: "ASIA",
    matchType: "Knockout",
    enrolled: 20,
  },
  // Legg til flere turneringer her
];

export const fortniteCriteria = {
  regions: ["EU", "NA", "ASIA", "SA"],
  teamSizes: ["1v1", "2v2"],
  matchTypes: ["Build Mode", "No Build Mode", "Knockout", "Round Robin"],
};

export const fortniteData = {
  gameImage: "/images/games/fortnite.jpg",
  matches: fortniteMatches,
  tournaments: fortniteTournaments,
  criteria: fortniteCriteria,
};
