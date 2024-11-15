// app/login.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../authcontext"; // Bruk authcontext i små bokstaver

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const mockUsername = "user123";
  const mockPassword = "Str0ngP@ssw0rd!";
  const mockBalance = 1000; // Eksempel på saldo

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === mockUsername && password === mockPassword) {
      console.log("Innlogging vellykket. Oppdaterer authcontext.");

      // Kall login-funksjonen fra AuthContext
      login(mockBalance);

      // Naviger til forsiden
      router.push("/"); // Omdirigerer til hovedsiden etter innlogging
    } else {
      console.log("Innlogging feilet: Feil brukernavn eller passord.");
      setError("Invalid username or password.");
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
