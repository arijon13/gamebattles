"use client";

import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = () => {
    if (email) {
      setEmailSent(true);
      // Her ville en e-post blitt sendt med en tilbakestillingslenke i et ekte system
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <main className="bg-blue-800 text-white min-h-screen flex flex-col items-center justify-center py-10">
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-3xl font-bold mb-4">Forgot Password</h2>

        {emailSent ? (
          <p className="text-lg text-blue-200">
            A password reset link has been sent to your email.
          </p>
        ) : (
          <>
            <p className="mb-4 text-blue-200">Enter your email to reset your password.</p>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Your email address"
              className="w-full px-4 py-2 text-blue-900 rounded-md mb-4"
            />
            <button
              onClick={handleResetPassword}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-md shadow-md hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
            >
              Send Reset Link
            </button>
          </>
        )}
      </div>
    </main>
  );
}
