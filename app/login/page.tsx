"use client";

import { useState } from "react";
import { useAuth } from "../authcontext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const email = identifier.includes('@') ? identifier : `${identifier}@gamebattles.com`;

    try {
      await login(email, password);
      console.log("[LOGIN PAGE] Login successful!");
      router.push("/");
    } catch (err: any) {
      console.error("[LOGIN PAGE] Login failed:", err.message || err);
      setError("Invalid username/email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] py-12 px-4">
      <div className="max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#2e3354] rounded-2xl shadow-2xl p-8 border border-[#86d9f9]/20"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00e7ff] to-[#0077ff] 
              bg-clip-text text-transparent mb-2">Welcome back</h1>
            <p className="text-[#86d9f9]">
              New to GameBattles?{" "}
              <Link href="/register" className="text-[#00e7ff] hover:underline">Create an account</Link>
            </p>
          </div>

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

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="text-[#ff475a] text-sm text-center p-3 bg-[#ff475a]/10 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[#86d9f9] mb-2">Email or Username</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#1a1b32] text-white border border-[#86d9f9]/20
                  focus:border-[#00e7ff] focus:ring-1 focus:ring-[#00e7ff] transition-all"
                placeholder="Enter your email or username"
                required
              />
            </div>

            <div>
              <label className="block text-[#86d9f9] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#1a1b32] text-white border border-[#86d9f9]/20
                  focus:border-[#00e7ff] focus:ring-1 focus:ring-[#00e7ff] transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-[#86d9f9]">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-[#00e7ff] hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full p-4 bg-gradient-to-r from-[#00e7ff] to-[#0077ff] text-white font-bold 
                rounded-lg hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,231,255,0.3)]"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
