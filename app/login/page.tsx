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
      // Call the login function from AuthContext
      await login(email, password);
      console.log("[LOGIN PAGE] Login successful!");

      // Redirect to the homepage after successful login
      router.push("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid email or password.";
      console.error("[LOGIN PAGE] Login failed:", errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl text-white mb-4">Log In</h2>
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
          Log In
        </button>
      </form>
    </div>
  );
}
