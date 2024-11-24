"use client";

import { useState } from "react";

export interface Tournament {
  id: number;
  image: string;
  entryFee: string;
  region: string;
  matchType: string;
  enrolled: number;
}

interface TournamentsProps {
  tournaments: Tournament[];
}

export default function Tournaments({ tournaments }: TournamentsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Antall turneringer per side
  const totalPages = Math.ceil(tournaments.length / pageSize);

  // Beregn turneringer for nåværende side
  const currentTournaments = tournaments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#1f2236] to-[#292d3e] p-8 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-white tracking-wider mb-8">
        Available Tournaments
      </h2>

      {/* Grid med turneringer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="bg-[#292d3e] p-6 rounded-lg shadow-md transition-transform hover:scale-105"
          >
            <img
              src={tournament.image}
              alt={`Tournament ${tournament.id}`}
              className="w-full h-32 object-cover rounded-lg mb-4 border border-[#3e445c]"
            />
            <div className="flex justify-between items-center text-white text-sm mb-4">
              <p className="text-cyan-400 font-bold">
                {tournament.entryFee === "$0" ? "Free" : `Entry Fee: ${tournament.entryFee}`}
              </p>
              <p className="text-gray-400">Region: {tournament.region}</p>
              <p className="text-gray-400">Match Type: {tournament.matchType}</p>
              <p className="text-blue-300 font-semibold">
                Enrolled: {tournament.enrolled}
              </p>
            </div>
            <button className="mt-4 px-6 py-2 w-full text-sm font-bold text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 shadow-md hover:shadow-lg hover:scale-105 transition-transform">
              View Tournament
            </button>
          </div>
        ))}
      </div>

      {/* Paginering */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-6 py-2 text-sm font-bold rounded-lg ${
            currentPage === 1
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-90"
          }`}
        >
          Previous
        </button>
        <p className="text-white">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-6 py-2 text-sm font-bold rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-90"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
