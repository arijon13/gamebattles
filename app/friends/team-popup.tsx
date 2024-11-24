"use client";

import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Friend } from "./friendsdata";

interface TeamPopupProps {
  isOpen: boolean;
  onClose: () => void;
  friendsData: Friend[];
}

export default function TeamPopup({
  isOpen,
  onClose,
  friendsData,
}: TeamPopupProps) {
  const [teamName, setTeamName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredFriends = friendsData.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedFriends = filteredFriends.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredFriends.length / itemsPerPage);

  const handleFriendSelection = (friendId: number) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleCreateTeam = () => {
    if (teamName && selectedFriends.length > 0) {
      const selectedNames = selectedFriends
        .map((id) => friendsData.find((friend) => friend.id === id)?.name)
        .join(", ");
      alert(`Team "${teamName}" created with members: ${selectedNames}`);
      onClose();
    } else {
      alert("Please enter a team name and select at least one friend.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-[#1a1d33] to-[#2d314b] p-6 rounded-2xl shadow-lg w-full max-w-lg border border-[#3e4260]">
        <h3 className="text-xl font-semibold mb-6 text-[#e4e6f0] text-center">
          Create a Team
        </h3>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-[#24283e] text-white placeholder-gray-500 focus:ring-2 focus:ring-[#46d1ff] focus:outline-none"
        />
        <h4 className="text-md font-medium text-[#9da4bf] mb-3">Friends</h4>
        <input
          type="text"
          placeholder="Search for friends"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mb-5 px-4 py-3 rounded-lg bg-[#24283e] text-white placeholder-gray-500 focus:ring-2 focus:ring-[#46d1ff] focus:outline-none"
        />
        {paginatedFriends.length === 0 ? (
          <p className="text-center text-gray-500">No friends found.</p>
        ) : (
          <ul className="space-y-4">
            {paginatedFriends.map((friend) => (
              <li
                key={friend.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  selectedFriends.includes(friend.id)
                    ? "bg-[#3e84e0] text-white"
                    : "bg-[#24283e] text-gray-400"
                }`}
              >
                <div className="flex items-center space-x-4">
                  {friend.icon ? (
                    <img
                      src={friend.icon}
                      alt={friend.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <UserCircleIcon className="w-10 h-10 text-[#46d1ff]" />
                  )}
                  <span className="text-md">{friend.name}</span>
                </div>
                <button
                  onClick={() => handleFriendSelection(friend.id)}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    selectedFriends.includes(friend.id)
                      ? "bg-red-500 hover:bg-red-400"
                      : "bg-[#46d1ff] hover:bg-[#3db5e0]"
                  }`}
                >
                  {selectedFriends.includes(friend.id) ? "Remove" : "Add"}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination */}
        <div className="flex justify-between mt-6">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 bg-[#24283e] text-white rounded-lg hover:bg-[#3e4260]"
            >
              Previous
            </button>
          )}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-[#24283e] text-white rounded-lg hover:bg-[#3e4260]"
            >
              Next
            </button>
          )}
        </div>

        {/* Back and Create Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={onClose}
            className="px-4 py-3 bg-[#24283e] text-white rounded-lg hover:bg-[#3e4260]"
          >
            Back
          </button>
          <button
            onClick={handleCreateTeam}
            className="px-4 py-3 bg-[#46d1ff] text-white rounded-lg hover:bg-[#3db5e0]"
          >
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
}
