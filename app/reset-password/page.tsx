"use client";

import { useState } from "react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordReset = () => {
    if (newPassword === confirmPassword) {
      setPasswordReset(true);
      // Her ville passordet blitt oppdatert i et ekte system
    } else {
      alert("Passwords do not match.");
    }
  };

  return (
    <main className="bg-blue-800 text-white min-h-screen flex flex-col items-center justify-center py-10">
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-3xl font-bold mb-4">Reset Password</h2>

        {passwordReset ? (
          <p className="text-lg text-blue-200">Your password has been reset successfully.</p>
        ) : (
          <>
            <p className="mb-4 text-blue-200">Enter your new password below.</p>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="w-full px-4 py-2 text-blue-900 rounded-md mb-4"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full px-4 py-2 text-blue-900 rounded-md mb-4"
            />
            <button
              onClick={handlePasswordReset}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-md shadow-md hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </main>
  );
}
