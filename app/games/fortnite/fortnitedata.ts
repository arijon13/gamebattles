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
];

export const fortniteTournaments = [
  {
    id: 1,
    image: "/images/games/fortnite.jpg",
    entryFee: "$15",
    region: "EU",
    matchType: "Build Mode",
    enrolled: 20,
  },
];

export const fortniteCriteria = {
  regions: ["EU", "NA", "ASIA", "SA"],
  teamSizes: ["1v1", "2v2", "3v3", "4v4"],
  matchTypes: ["Build Mode", "No Build Mode"],
  showRegion: true
};

export const fortniteData = {
  id: "fortnite",
  gameImage: "/images/games/fortnite.jpg",
  matches: fortniteMatches,
  tournaments: fortniteTournaments,
  criteria: fortniteCriteria,
};
