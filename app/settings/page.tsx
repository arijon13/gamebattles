"use client";

import { useState } from "react";
import Link from "next/link";

export default function Settings() {
  const [username, setUsername] = useState("Gamer123");
  const [email, setEmail] = useState("gamer123@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveChanges = () => {
    if (newPassword !== confirmNewPassword) {
      alert("The new passwords do not match.");
      return;
    }
    alert(`Settings updated for: ${username}`);
    // Optional: trigger form reset or further logic here
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = () => {
    alert("Account deleted.");
    setShowDeleteConfirm(false);
  };

  const cancelDeleteAccount = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center py-10">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-80">
        <h2 className="text-3xl font-bold text-blue-300 mb-4">Settings</h2>

        {/* Change Username */}
        <div className="mb-6">
          <label htmlFor="username" className="block text-lg mb-2">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 text-gray-900 rounded-md"
          />
        </div>

        {/* Change Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-gray-900 rounded-md"
          />
        </div>

        {/* Change Password */}
        <div className="mb-2">
          <label htmlFor="currentPassword" className="block text-lg mb-2">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2 text-gray-900 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="newPassword" className="block text-lg mb-2">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 text-gray-900 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmNewPassword" className="block text-lg mb-2">Confirm New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full px-4 py-2 text-gray-900 rounded-md"
          />
        </div>

        {/* Forgot Password Link */}
        <div className="mb-6 text-blue-300 text-sm hover:underline">
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>

        <button
          onClick={handleSaveChanges}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-md shadow-md hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
        >
          Save Changes
        </button>

        {/* Delete Account */}
        <div className="mt-8">
          <button
            onClick={handleDeleteAccount}
            className="px-6 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-500 transition-all duration-300"
          >
            Delete Account
          </button>
        </div>

        {/* Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <p className="mb-4">Are you sure you want to delete your account?</p>
              <button
                onClick={confirmDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-md mr-4 hover:bg-red-500 transition-all duration-300"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDeleteAccount}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
