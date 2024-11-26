"use client";

interface GameSearchingProps {
  onSearch: (amount: number) => void; // Callback for å starte søk
  searchingFor: number | null; // Beløpet som søkes etter
}

export default function GameSearching({
  onSearch,
  searchingFor,
}: GameSearchingProps) {
  return (
    <div className="mb-8 bg-[#1f2236] p-6 rounded-lg shadow-md">
      <h3 className="text-3xl font-bold text-white mb-6">Automatic Searches</h3>
      <div className="flex gap-8 justify-center">
        {[5, 25, 50].map((amount) => (
          <button
            key={amount}
            onClick={() => onSearch(amount)}
            disabled={searchingFor === amount}
            className={`px-12 py-6 rounded-xl text-lg font-bold transition-all ${
              searchingFor === amount
                ? "bg-gray-500 cursor-not-allowed text-gray-300"
                : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 hover:shadow-2xl"
            }`}
          >
            {searchingFor === amount
              ? `Searching for $${amount}...`
              : `$${amount}`}
          </button>
        ))}
      </div>

      {/* Progress-indikator */}
      {searchingFor !== null && (
        <div className="mt-6 flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-t-cyan-500 border-r-cyan-500 border-gray-300 rounded-full animate-spin"></div>
          <span className="ml-4 text-cyan-400 text-lg font-medium">
            Searching for a match...
          </span>
        </div>
      )}
    </div>
  );
}
