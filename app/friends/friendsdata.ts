// Friends data - For now, dummy data for testing
export interface Friend {
  id: number;
  name: string;
  status: "online" | "offline";
  icon?: string; // Optional profile image
}

export const friendsData: Friend[] = [
  { id: 1, name: "PlayerOne", status: "online", icon: "/images/profiles/player1.jpg" },
  { id: 2, name: "PlayerTwo", status: "offline", icon: "/images/profiles/player2.jpg" },
  { id: 3, name: "GamerGirl", status: "online" },
  { id: 4, name: "ProPlayer", status: "offline", icon: "/images/profiles/player3.jpg" },
  { id: 5, name: "NoobMaster", status: "online" },
  { id: 6, name: "SniperKing", status: "offline" },
  { id: 7, name: "ClutchQueen", status: "online" },
];
