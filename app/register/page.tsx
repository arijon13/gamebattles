"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../authcontext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showGamesPopup, setShowGamesPopup] = useState(false);
  const [showAllGames, setShowAllGames] = useState(false);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await register(username, email, password);
      setShowGamesPopup(true); // Show the games popup after successful registration
    } catch (err: any) {
      console.error("HandleRegister error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleSelectGame = (game: string) => {
    if (selectedGames.includes(game)) {
      // Uncheck the game if it's already selected
      setSelectedGames(selectedGames.filter((g) => g !== game));
    } else {
      // Select the game if it's not already selected
      setSelectedGames([...selectedGames, game]);
    }
  };

  const handleOAuthLogin = (game: string) => {
    // Mock OAuth login for the selected game
    console.log(`OAuth login for: ${game}`);
    // Here you would redirect to the actual OAuth flow for the selected game
  };

  const handleSkipGames = () => {
    router.push("/"); // Redirect to the home page if the user skips game selection
  };

  const allGames = ["Fortnite", "FIFA", "CS:GO", "Call of Duty", "League of Legends", "PUBG"];

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

      {/* Games Selection Popup */}
      {showGamesPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-white text-xl mb-4">Games</h3>
            <div className="flex flex-col space-y-2">
              {allGames.slice(0, showAllGames ? allGames.length : 3).map((game) => (
                <button
                  key={game}
                  onClick={() => handleSelectGame(game)}
                  className={`p-2 rounded-lg ${
                    selectedGames.includes(game)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {selectedGames.includes(game) ? `✔ ${game}` : game}
                </button>
              ))}
            </div>
            {!showAllGames && (
              <button
                onClick={() => setShowAllGames(true)}
                className="mt-4 w-full p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
              >
                Show more
              </button>
            )}
            <div className="mt-4">
              {selectedGames.map((game) => (
                <button
                  key={`${game}-login`}
                  onClick={() => handleOAuthLogin(game)}
                  className="w-full p-2 mb-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400"
                >
                  Log in to {game}
                </button>
              ))}
            </div>
            <button
              onClick={handleSkipGames}
              className="mt-4 w-full p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
            >
              Skip for now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
