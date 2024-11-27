"use client";

import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Friend } from "./friendsdata";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#1a1b32] to-[#2e3354] p-6 rounded-2xl 
          shadow-2xl w-full max-w-lg border border-[#86d9f9]/20 space-y-6"
      >
        <h3 className="text-2xl font-bold text-white text-center">Create a Team</h3>
        
        {/* Team Name Input */}
        <div className="space-y-2">
          <label className="text-sm text-[#86d9f9]/70">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#1a1b32]/80 text-white 
              placeholder-[#86d9f9]/50 border border-[#86d9f9]/20 
              focus:border-[#86d9f9]/50 focus:outline-none focus:ring-2 
              focus:ring-[#86d9f9]/20"
            placeholder="Enter team name"
          />
        </div>

        {/* Friend Search */}
        <div className="space-y-2">
          <label className="text-sm text-[#86d9f9]/70">Add Members</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#1a1b32]/80 text-white 
              placeholder-[#86d9f9]/50 border border-[#86d9f9]/20 
              focus:border-[#86d9f9]/50 focus:outline-none focus:ring-2 
              focus:ring-[#86d9f9]/20"
            placeholder="Search friends"
          />
        </div>

        {/* Friends List */}
        <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
          {paginatedFriends.map((friend) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300
                ${selectedFriends.includes(friend.id)
                  ? 'bg-[#00e7ff]/20 border-[#00e7ff]/50'
                  : 'bg-[#1a1b32]/60 hover:bg-[#1a1b32]/80'}
                border border-[#86d9f9]/20`}
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
            </motion.div>
          ))}
        </div>

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
      </motion.div>
    </motion.div>
  );
}
