"use client";

export const fortniteMatches = [
  {
    id: 1,
    image: "/images/games/fortnite.jpg", // Bruker fortnite.jpg
    entryFee: "$5",
    teamSize: "1v1",
    region: "EU",
    matchType: "Build Mode",
  },
  {
    id: 2,
    image: "/images/games/fortnite.jpg", // Bruker fortnite.jpg
    entryFee: "$10",
    teamSize: "2v2",
    region: "NA",
    matchType: "No Build Mode",
  },
];

export const fortniteTournaments = [
  {
    id: 1,
    entryFee: "$20",
    region: "EU",
    matchType: "Knockout",
  },
  {
    id: 2,
    entryFee: "$25",
    region: "NA",
    matchType: "Round Robin",
  },
];

export const fortniteCriteria = {
  regions: ["EU", "NA", "ASIA", "SA"],
  teamSizes: ["1v1", "2v2"],
  matchTypes: ["Build Mode", "No Build Mode", "Knockout", "Round Robin"],
};

export const fortniteData = {
  gameImage: "/images/games/fortnite.jpg", // Bruker fortnite.jpg
  matches: fortniteMatches,
  tournaments: fortniteTournaments,
  criteria: fortniteCriteria,
};
