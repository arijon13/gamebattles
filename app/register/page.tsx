"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../authcontext";
import SelectGamesPopup from "../../components/SelectGamesPopup";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showGamesPopup, setShowGamesPopup] = useState(false);
  const [selectedGames, setSelectedGames] = useState<string[]>([]); // Fixed line
  const [error, setError] = useState("");
  const router = useRouter();
  const { register } = useAuth();

  const allGames = [
    "Fortnite",
    "FIFA",
    "CS:GO",
    "Call of Duty",
    "League of Legends",
    "PUBG",
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Register the user
      await register(username, email, password);

      // Optionally, trigger the popup for games
      setShowGamesPopup(true);
    } catch (err: any) {
      console.error("Error during registration:", err);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleSelectGame = (game: string) => {
    if (selectedGames.includes(game)) {
      setSelectedGames(selectedGames.filter((g) => g !== game));
    } else {
      setSelectedGames([...selectedGames, game]);
    }
  };

  const handleOAuthLogin = (game: string) => {
    console.log(`OAuth login for: ${game}`);
    // Add actual OAuth logic for the selected game
  };

  const handleSkipGames = () => {
    setShowGamesPopup(false);
    router.push("/"); // Redirect to the homepage
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl text-white mb-4">Register</h2>
        <div className="mb-4">
          <label className="text-white block mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-white block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-white block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
        >
          Register
        </button>
      </form>

      {showGamesPopup && (
        <SelectGamesPopup
          allGames={allGames}
          selectedGames={selectedGames}
          onSelectGame={handleSelectGame}
          onOAuthLogin={handleOAuthLogin}
          onClose={handleSkipGames}
        />
      )}
    </div>
  );
}
