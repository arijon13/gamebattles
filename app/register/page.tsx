"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../authcontext";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState("");
  const [showGamesPopup, setShowGamesPopup] = useState(false);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    upperCase: false,
    lowerCase: false,
    numbers: false,
    symbols: false,
  });

  const checkPasswordStrength = (password: string) => {
    setPasswordStrength({
      length: password.length >= 10,
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
      numbers: /[0-9]/.test(password),
      symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'password') {
        checkPasswordStrength(value);
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.acceptTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    try {
      await register(formData.username, formData.email, formData.password);
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

  const handleSkipGames = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#2e3354] rounded-2xl shadow-2xl p-8 border border-[#86d9f9]/20"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00e7ff] to-[#0077ff] 
              bg-clip-text text-transparent mb-2">Step up your game</h1>
            <p className="text-[#86d9f9]">Join Today</p>
            <p className="text-[#86d9f9] mt-2">
              Already a member?{" "}
              <Link href="/login" className="text-[#00e7ff] hover:underline">Sign in</Link>
            </p>
          </div>

          {/* Social Logins (visual only for now) */}
          <div className="space-y-3 mb-8">
            {[
              { name: "Facebook", color: "bg-[#1877F2]" },
              { name: "Twitch", color: "bg-[#9146FF]" },
              { name: "Apple", color: "bg-[#000000]" },
            ].map((provider) => (
              <button
                key={provider.name}
                className={`w-full p-3 ${provider.color} rounded-lg text-white font-semibold 
                  flex items-center justify-center space-x-2 hover:opacity-90 transition-all`}
              >
                <span>Continue with {provider.name}</span>
              </button>
            ))}
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#86d9f9]/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#2e3354] text-[#86d9f9]">Or</span>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-6">
            {error && (
              <div className="text-[#ff475a] text-sm text-center p-3 bg-[#ff475a]/10 rounded-lg">
                {error}
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-[#86d9f9] mb-2">Desired Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-[#1a1b32] text-white border border-[#86d9f9]/20
                  focus:border-[#00e7ff] focus:ring-1 focus:ring-[#00e7ff] transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#86d9f9] mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-[#1a1b32] text-white border border-[#86d9f9]/20
                  focus:border-[#00e7ff] focus:ring-1 focus:ring-[#00e7ff] transition-all"
                required
              />
            </div>

            {/* Password with strength indicators */}
            <div>
              <label className="block text-[#86d9f9] mb-2">Create Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-[#1a1b32] text-white border border-[#86d9f9]/20
                  focus:border-[#00e7ff] focus:ring-1 focus:ring-[#00e7ff] transition-all"
                required
              />
              <div className="mt-2 space-y-1">
                {Object.entries(passwordStrength).map(([key, isValid]) => (
                  <div key={key} className={`text-sm ${isValid ? 'text-green-400' : 'text-[#86d9f9]'}`}>
                    ✓ {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[#86d9f9] mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg bg-[#1a1b32] text-white border border-[#86d9f9]/20
                  focus:border-[#00e7ff] focus:ring-1 focus:ring-[#00e7ff] transition-all"
                required
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="mt-1"
              />
              <label className="text-sm text-[#86d9f9]">
                I accept the <Link href="/terms" className="text-[#00e7ff] hover:underline">Terms and Conditions</Link> and{" "}
                <Link href="/privacy" className="text-[#00e7ff] hover:underline">Privacy Policy</Link>. 
                I certify that I am at least 18 years of age and don't already have another GameBattles account.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-4 bg-gradient-to-r from-[#00e7ff] to-[#0077ff] text-white font-bold 
                rounded-lg hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,231,255,0.3)]"
            >
              Join Now
            </button>
          </form>
        </motion.div>
      </div>

      {/* Keep your original games popup */}
      {showGamesPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2e3354] p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#c3c8f3] mb-4">
              Select Your Favorite Games
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {["Fortnite", "FIFA", "CS:GO", "Call of Duty", "League of Legends", "PUBG"].map((game) => (
                <button
                  key={game}
                  onClick={() => handleSelectGame(game)}
                  className={`p-3 rounded-lg text-center font-semibold ${
                    selectedGames.includes(game)
                      ? "bg-[#00e7ff] text-[#1a1b32]"
                      : "bg-[#1a1b32] text-[#86d9f9]"
                  } hover:bg-[#00e7ff] hover:text-[#1a1b32] transition-all`}
                >
                  {game}
                </button>
              ))}
            </div>
            <button
              onClick={handleSkipGames}
              className="mt-6 w-full p-3 bg-gradient-to-r from-[#00e7ff] to-[#0077ff] text-white 
                rounded-lg hover:opacity-90 transition-all font-semibold"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
