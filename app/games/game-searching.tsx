"use client";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface GameSearchingProps {
  onSearch: (amount: number) => void;
  searchingFor: number | null;
}

export default function GameSearching({
  onSearch,
  searchingFor,
}: GameSearchingProps) {
  return (
    <div className="mb-8 bg-[#1f2236] p-8 rounded-xl shadow-xl">
      <div className="flex items-center gap-2 mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text 
                     bg-gradient-to-r from-[#00e7ff] to-[#0077ff]">
          Automatic Searches
        </h3>
        <div className="group relative">
          <InformationCircleIcon className="w-5 h-5 text-[#00e7ff] cursor-help" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 
                        bg-[#2a2f48] text-white text-sm rounded-lg shadow-xl
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible
                        transition-all duration-200 z-50">
            Automatically search for matches with your selected wager amount. 
            The system will notify you when a suitable match is found.
            <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 
                          border-4 border-transparent border-t-[#2a2f48]" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6">
        {[5, 25, 50].map((amount) => (
          <button
            key={amount}
            onClick={() => onSearch(amount)}
            disabled={searchingFor === amount}
            className={`
              px-12 py-6 rounded-xl text-lg font-bold
              transition-all duration-300
              ${searchingFor === amount
                ? "bg-gray-600/50 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-[#00e7ff] to-[#0077ff] text-white hover:opacity-80"
              }
            `}
          >
            {searchingFor === amount ? `Searching $${amount}...` : `$${amount}`}
          </button>
        ))}
      </div>
    </div>
  );
}
