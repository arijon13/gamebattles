"use client";

import { useState } from "react";
import { TrophyIcon, UserGroupIcon, GlobeAltIcon, SparklesIcon } from "@heroicons/react/24/outline";

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
  const pageSize = 6;
  const totalPages = Math.ceil(tournaments.length / pageSize);
  const currentTournaments = tournaments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-gradient-to-b from-[#1f2236] to-[#292d3e] p-8 rounded-xl shadow-2xl">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <TrophyIcon className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text 
                         bg-gradient-to-r from-white to-gray-300">
            Official Tournaments
          </h2>
        </div>
        <div className="px-4 py-2 bg-[#2a2f48] rounded-lg border border-[#3d4674]">
          <span className="text-cyan-400 font-semibold">
            {tournaments.length} Active Tournaments
          </span>
        </div>
      </div>

      {/* Tournament Grid with Staggered Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {currentTournaments.map((tournament, index) => (
          <div
            key={tournament.id}
            className="opacity-0 animate-cardEntrance"
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
          >
            <div className="group bg-gradient-to-b from-[#2a2f48] to-[#1f2236] 
                         rounded-xl shadow-xl border border-[#3d4674] overflow-hidden
                         transform transition-all duration-300 hover:scale-[1.02]
                         hover:shadow-2xl hover:shadow-cyan-500/10">
              {/* Tournament Image */}
              <div className="relative overflow-hidden">
                <img
                  src={tournament.image}
                  alt={`Tournament ${tournament.id}`}
                  className="w-full h-36 sm:h-48 object-cover transition-transform duration-500
                           group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f2236] to-transparent" />
                
                {/* Entry Fee Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 rounded-full
                             bg-gradient-to-r from-cyan-500 to-blue-500 
                             text-white font-bold text-sm shadow-lg">
                  {tournament.entryFee === "$0" ? "Free Entry" : tournament.entryFee}
                </div>
              </div>

              {/* Tournament Details */}
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  {/* Tournament Info */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <GlobeAltIcon className="w-4 h-4 text-cyan-400" />
                      {tournament.region}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <SparklesIcon className="w-4 h-4 text-cyan-400" />
                      {tournament.matchType}
                    </div>
                  </div>
                  
                  {/* Enrollment Status */}
                  <div className="flex items-center gap-2">
                    <UserGroupIcon className="w-5 h-5 text-blue-400" />
                    <div className="flex-1 h-2 bg-[#3d4674] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                        style={{ width: `${Math.min((tournament.enrolled / 100) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-blue-400 font-semibold text-sm">
                      {tournament.enrolled}/100
                    </span>
                  </div>

                  {/* Action Button */}
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 
                                   text-white font-bold rounded-lg shadow-lg
                                   transform transition-all duration-300
                                   hover:from-cyan-600 hover:to-blue-600
                                   hover:scale-[1.02] hover:shadow-xl
                                   focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-8 sm:mt-12">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300
                     ${currentPage === 1
                       ? "bg-[#2a2f48] text-gray-500 cursor-not-allowed"
                       : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:scale-105"
                     }`}
          >
            Previous
          </button>
          
          <span className="text-lg font-bold text-transparent bg-clip-text 
                          bg-gradient-to-r from-cyan-400 to-blue-400">
            {currentPage} / {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300
                     ${currentPage === totalPages
                       ? "bg-[#2a2f48] text-gray-500 cursor-not-allowed"
                       : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:scale-105"
                     }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
