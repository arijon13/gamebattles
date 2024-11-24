"use client";

import { useState } from "react";
import TeamPopup from "./team-popup"; // Import the popup component
import { friendsData, Friend } from "./friendsdata";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function FriendsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <main className="bg-gradient-to-br from-[#1a1b32] via-[#121222] to-[#0f0f20] text-white min-h-screen py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Friends</h1>

      {friendsData.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          You don’t have any friends yet.
        </p>
      ) : (
        <>
          {/* Online Friends */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Online</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {friendsData
                .filter((friend) => friend.status === "online")
                .map((friend) => (
                  <div
                    key={friend.id}
                    className="bg-[#292d3e] p-4 rounded-lg shadow-md flex items-center space-x-4"
                  >
                    {friend.icon ? (
                      <img
                        src={friend.icon}
                        alt={friend.name}
                        className="w-10 h-10 rounded-full border-2 border-cyan-400"
                      />
                    ) : (
                      <UserCircleIcon className="w-10 h-10 text-cyan-400" />
                    )}
                    <div>
                      <span>{friend.name}</span>
                      <span className="block text-sm text-green-400">Online</span>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Offline Friends */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-400">Offline</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {friendsData
                .filter((friend) => friend.status === "offline")
                .map((friend) => (
                  <div
                    key={friend.id}
                    className="bg-[#292d3e] p-4 rounded-lg shadow-md flex items-center space-x-4"
                  >
                    {friend.icon ? (
                      <img
                        src={friend.icon}
                        alt={friend.name}
                        className="w-10 h-10 rounded-full border-2 border-gray-500"
                      />
                    ) : (
                      <UserCircleIcon className="w-10 h-10 text-gray-500" />
                    )}
                    <div>
                      <span>{friend.name}</span>
                      <span className="block text-sm text-gray-400">Offline</span>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </>
      )}

      {/* Teams Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Teams</h2>
        <button
          onClick={toggleModal}
          className="w-full py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-400"
        >
          Create Team
        </button>
      </section>

      {/* Modal Popup */}
      <TeamPopup
        isOpen={isModalOpen}
        onClose={toggleModal}
        friendsData={friendsData}
      />
    </main>
  );
}
