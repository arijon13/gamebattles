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
      await register(username, email, password);
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
  };

  const handleSkipGames = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#1a1d31] via-[#10132b] to-[#0d0f26]">
      <form
        onSubmit={handleRegister}
        className="bg-[#2e3354] p-8 rounded-lg shadow-xl w-full max-w-sm border border-[#4b86e1]"
      >
        <h2 className="text-2xl font-bold text-[#c3c8f3] mb-6 text-center">
          Register
        </h2>
        <div className="mb-4">
          <label className="text-[#86d9f9] block mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#3c4263] text-white placeholder-[#6672a1] focus:outline-none focus:ring-2 focus:ring-[#4b86e1] border border-[#4b86e1]"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-[#86d9f9] block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#3c4263] text-white placeholder-[#6672a1] focus:outline-none focus:ring-2 focus:ring-[#4b86e1] border border-[#4b86e1]"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="text-[#86d9f9] block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#3c4263] text-white placeholder-[#6672a1] focus:outline-none focus:ring-2 focus:ring-[#4b86e1] border border-[#4b86e1]"
            placeholder="Enter your password"
            required
          />
        </div>
        {error && (
          <p className="text-[#ff475a] text-sm mb-4 text-center">{error}</p>
        )}
        <button
          type="submit"
          className="w-full p-3 rounded-lg bg-gradient-to-r from-[#4b86e1] to-[#73a9f1] text-white font-semibold hover:opacity-90 transition-all"
        >
          Register
        </button>
      </form>

      {showGamesPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2e3354] p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#c3c8f3] mb-4">
              Select Games
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {allGames
                .slice(0, showAllGames ? allGames.length : 3)
                .map((game) => (
                  <button
                    key={game}
                    onClick={() => handleSelectGame(game)}
                    className={`p-3 rounded-lg text-center font-semibold ${
                      selectedGames.includes(game)
                        ? "bg-[#4b86e1] text-white"
                        : "bg-[#3c4263] text-[#c3c8f3]"
                    } hover:bg-[#4b86e1] transition-all`}
                  >
                    {selectedGames.includes(game) ? `✔ ${game}` : game}
                  </button>
                ))}
            </div>
            {!showAllGames && (
              <button
                onClick={() => setShowAllGames(true)}
                className="mt-4 w-full p-3 bg-gradient-to-r from-[#4b86e1] to-[#73a9f1] text-white rounded-lg hover:opacity-90 transition-all"
              >
                Show more
              </button>
            )}
            <div className="mt-4 space-y-2">
              {selectedGames.map((game) => (
                <button
                  key={`${game}-login`}
                  onClick={() => handleOAuthLogin(game)}
                  className="w-full p-3 bg-[#ffcc00] text-black rounded-lg hover:opacity-90 transition-all"
                >
                  Log in to {game}
                </button>
              ))}
            </div>
            <button
              onClick={handleSkipGames}
              className="mt-4 w-full p-3 bg-[#3c4263] text-[#c3c8f3] rounded-lg hover:bg-[#4b86e1] transition-all"
            >
              Skip for now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
