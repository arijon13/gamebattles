"use client";

import { useState } from "react";
import { useAuth } from "../authcontext"; // Ensure this path matches your project structure
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("[LOGIN PAGE] Email entered:", email);

    try {
      await login(email, password);
      console.log("[LOGIN PAGE] Login successful!");
      router.push("/");
    } catch (err: any) {
      console.error("[LOGIN PAGE] Login failed:", err.message || err);
      setError(err.message || "Invalid email or password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#1a1d31] via-[#10132b] to-[#0d0f26]">
      <form
        onSubmit={handleLogin}
        className="bg-[#2e3354] p-8 rounded-lg shadow-xl w-full max-w-sm border border-[#4b86e1]"
      >
        <h2 className="text-2xl font-bold text-[#c3c8f3] mb-6 text-center">
          Log In
        </h2>
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
          Log In
        </button>
      </form>
    </div>
  );
}
