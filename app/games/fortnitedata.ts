const fortniteData = {
  gameImage: "/images/games/fortnite.jpg",
  matches: [
    {
      id: 1,
      image: "/images/games/fortnite.jpg",
      entryFee: "$10",
      teamSize: "2v2",
      region: "EU",
      fightType: "Standard",
    },
  ],
  tournaments: [
    {
      id: 1,
      entryFee: "$10",
      region: "EU",
      fightType: "Elimination",
    },
  ],
  criteria: {
    regions: ["EU", "NA", "ASIA"], // Kun regioner tilgjengelig i Fortnite
    teamSizes: ["1v1", "2v2", "3v3"], // Spesifikke team-størrelser for Fortnite
    fightTypes: ["Standard", "Elimination"], // Spesifikke kamptyper
  },
};

export default fortniteData;
