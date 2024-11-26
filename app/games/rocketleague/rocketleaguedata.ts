"use client";

export const rocketleagueMatches = [
  {
    id: 1,
    gameId: "rocketleague",
    image: "/images/games/rocket-league.png",
    entryFee: "$10",
    teamSize: "2v2",
    region: "EU",
    matchType: "Best of 3"
  }
];

export const rocketleagueTournaments = [
  {
    id: 1,
    image: "/images/games/rocket-league.png",
    entryFee: "$20",
    region: "EU",
    matchType: "Best of 5",
    enrolled: 16
  }
];

export const rocketleagueCriteria = {
  regions: ["EU", "NA", "OCE"],
  teamSizes: ["1v1", "2v2", "3v3"],
  matchTypes: ["Best of 1", "Best of 3", "Best of 5"],
  showRegion: true
};

export const rocketleagueData = {
  id: "rocketleague",
  gameImage: "/images/games/rocket-league.png",
  matches: rocketleagueMatches,
  tournaments: rocketleagueTournaments,
  criteria: rocketleagueCriteria
}; 