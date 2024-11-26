"use client";

import { useState, useMemo, ReactNode } from 'react';
import { Match } from "./matches";
import { fifaCriteria } from "./fifa/fifadata";
import { fortniteCriteria } from "./fortnite/fortnitedata";
import { rocketleagueCriteria } from './rocketleague/rocketleaguedata';
import { apexlegendsCriteria } from './apexlegends/apexlegendsdata';
import { friendsData } from "../friends/friendsdata";
import { UserCircleIcon } from "@heroicons/react/24/outline";

// Define interfaces for all components
interface CreateMatchProps {
  onCreate: (newMatch: Match) => void;
  isOpen: boolean;
  onClose: () => void;
  gameImage: string;
  gameId: string;
}

interface MatchDetails {
  entryFee: string;
  teamSize: string;
  region: string;
  matchType: string;
}

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  matchDetails: MatchDetails;
}

interface MatchPreviewProps {
  formData: MatchDetails;
  gameImage: string;
}

interface TooltipProps {
  text: string;
  children: ReactNode;
}

interface TeamMember {
  id: number;
  name: string;
  icon?: string;
}

interface Team {
  id: number;
  name: string;
  members: {
    id: number;
    name: string;
    icon?: string;
  }[];
  size: string; // e.g., "2v2", "3v3"
}

// Add this dummy data (later you'll want to move this to a separate file)
const savedTeams: Team[] = [
  // This is empty for now, teams will be added when users create them
];

// Helper components with proper type annotations
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  matchDetails 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1f2236] p-6 rounded-xl shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Confirm Match Creation</h3>
        <div className="text-gray-300 space-y-2">
          <p>Entry Fee: ${matchDetails.entryFee}</p>
          <p>Team Size: {matchDetails.teamSize}</p>
          <p>Match Type: {matchDetails.matchType}</p>
          {matchDetails.region && <p>Region: {matchDetails.region}</p>}
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const MatchPreview = ({ formData, gameImage }: MatchPreviewProps) => {
  return (
    <div className="mt-6 p-4 bg-[#2e3354] rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-3">Match Preview</h3>
      <div className="flex items-center space-x-4">
        <img src={gameImage} alt="Game" className="w-16 h-16 rounded" />
        <div>
          <p className="text-gray-300">Entry Fee: ${formData.entryFee}</p>
          <p className="text-gray-300">Team Size: {formData.teamSize}</p>
          <p className="text-gray-300">Match Type: {formData.matchType}</p>
          {formData.region && (
            <p className="text-gray-300">Region: {formData.region}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Tooltip = ({ text, children }: TooltipProps) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {text}
      </div>
    </div>
  );
};

const getGameRules = (gameId: string) => {
  switch (gameId) {
    case 'fifa':
      return {
        minEntryFee: 1,
        maxEntryFee: 100,
        rules: [
          "Standard matches are 12 minutes long",
          "Pro Clubs require minimum 5 players",
          "No custom teams allowed"
        ]
      };
    case 'fortnite':
      return {
        minEntryFee: 1,
        maxEntryFee: 50,
        rules: [
          "Build Mode: Standard building rules apply",
          "No Build Mode: No building structures",
          "Must have 2FA enabled"
        ]
      };
    case 'rocketleague':
      return {
        minEntryFee: 1,
        maxEntryFee: 75,
        rules: [
          "Standard tournament rules apply",
          "Best of matches must complete all games",
          "No forfeiting allowed"
        ]
      };
    case 'apexlegends':
      return {
        minEntryFee: 1,
        maxEntryFee: 60,
        rules: [
          "Battle Royale: Standard BR rules apply",
          "Arenas: Best of 3 rounds",
          "Control: Point-based objectives"
        ]
      };
    default:
      return {
        minEntryFee: 1,
        maxEntryFee: 100,
        rules: []
      };
  }
};

export default function CreateMatch({ 
  onCreate, 
  isOpen, 
  onClose, 
  gameImage, 
  gameId,
}: CreateMatchProps) {
  const [formData, setFormData] = useState<MatchDetails>({
    entryFee: "",
    teamSize: "",
    region: "",
    matchType: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showTeamSelection, setShowTeamSelection] = useState(false);

  // Get the correct criteria based on the gameId
  const criteria = useMemo(() => {
    switch (gameId) {
      case 'fifa':
        return fifaCriteria;
      case 'fortnite':
        return fortniteCriteria;
      case 'rocketleague':
        return rocketleagueCriteria;
      case 'apexlegends':
        return apexlegendsCriteria;
      default:
        return fortniteCriteria;
    }
  }, [gameId]);

  console.log('Current game:', gameId); // Debug log
  console.log('Using criteria:', criteria); // Debug log

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate entry fee
    if (!formData.entryFee) {
      newErrors.entryFee = "Entry fee is required";
    } else if (parseFloat(formData.entryFee) <= 0) {
      newErrors.entryFee = "Entry fee must be greater than 0";
    }

    // Validate other fields
    if (!formData.teamSize) newErrors.teamSize = "Team size is required";
    if (!formData.matchType) newErrors.matchType = "Match type is required";
    if (criteria.showRegion && !formData.region) {
      newErrors.region = "Region is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Validate based on game type
      const requiredFields = criteria.showRegion 
        ? ['entryFee', 'teamSize', 'region', 'matchType']
        : ['entryFee', 'teamSize', 'matchType'];

      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        alert("Please fill out all required fields");
        return;
      }

      const newMatch: Match = {
        id: Date.now(),
        image: gameImage,
        gameId: gameId,
        entryFee: `$${formData.entryFee}`,
        teamSize: formData.teamSize,
        region: criteria.showRegion ? formData.region : 'N/A',
        matchType: formData.matchType,
      };

      await onCreate(newMatch);
      onClose();
      setFormData({
        entryFee: "",
        teamSize: "",
        region: "",
        matchType: "",
      });
    } catch (error) {
      console.error('Failed to create match:', error);
      // Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTeamSizeChange = (size: string) => {
    handleChange("teamSize", size);
    setShowTeamSelection(size !== "1v1");
    setSelectedTeam(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-b from-[#1a1d31] to-[#2e3354] border border-[#4b86e1] rounded-xl w-[90%] max-w-lg shadow-2xl relative">
        {/* Top Section */}
        <div className="bg-gradient-to-r from-[#2e3354] to-[#1a1d31] p-6 rounded-t-lg relative shadow-md">
          <h3 className="text-cyan-400 text-base font-semibold absolute top-4 left-6 tracking-wide">
            Create Match
          </h3>
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-gray-400 hover:text-cyan-300 transition-colors text-lg"
          >
            ✖
          </button>
          <div className="pt-8 pb-3">
            <h2 className="text-xl font-bold text-white tracking-wider">
              {gameId.toUpperCase()} Match Details
            </h2>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 overflow-y-auto bg-gradient-to-b from-[#1a1d31] to-[#10132b] rounded-b-lg shadow-inner">
          <form onSubmit={(e) => {
            e.preventDefault();
            if (validateForm()) {
              handleSubmit();
            }
          }} className="flex flex-col gap-6">
            {/* Entry Fee */}
            <div className="flex flex-col gap-2">
              <label className="text-cyan-400 font-semibold">Entry Fee ($)</label>
              <input
                type="number"
                value={formData.entryFee}
                onChange={(e) => handleChange("entryFee", e.target.value)}
                className="bg-[#2e3354] border border-[#4b86e1] text-white p-3 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="Enter amount"
              />
              {errors.entryFee && (
                <span className="text-red-400 text-sm">{errors.entryFee}</span>
              )}
            </div>

            {/* Team Size */}
            <div className="flex flex-col gap-2">
              <Tooltip text="Select your team size for this match">
                <label className="text-cyan-400 font-semibold">Team Size</label>
              </Tooltip>
              <select
                value={formData.teamSize}
                onChange={(e) => handleTeamSizeChange(e.target.value)}
                className="bg-[#2e3354] border border-[#4b86e1] text-white p-3 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
              >
                <option value="">Select team size</option>
                {criteria.teamSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Team Selection Section */}
            {showTeamSelection && (
              <div className="flex flex-col gap-4">
                <h3 className="text-cyan-400 font-semibold">Select Team</h3>
                {savedTeams.length === 0 ? (
                  <div className="bg-[#2e3354] p-4 rounded-lg border border-[#4b86e1]">
                    <p className="text-gray-300 text-center">No teams available</p>
                    <p className="text-sm text-cyan-400 text-center mt-2">
                      Create a team in the Teams section to use here
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto">
                    {savedTeams
                      .filter(team => team.size === formData.teamSize)
                      .map(team => (
                        <button
                          key={team.id}
                          type="button"
                          onClick={() => setSelectedTeam(team)}
                          className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                            selectedTeam?.id === team.id
                              ? 'bg-cyan-500 bg-opacity-20 border border-cyan-500'
                              : 'bg-[#2e3354] hover:bg-[#3c4263] border border-[#4b86e1]'
                          }`}
                        >
                          <span className="text-white font-medium">{team.name}</span>
                          <div className="flex -space-x-2">
                            {team.members.map(member => (
                              <div key={member.id} className="relative">
                                {member.icon ? (
                                  <img
                                    src={member.icon}
                                    alt={member.name}
                                    className="w-8 h-8 rounded-full border-2 border-[#2e3354]"
                                  />
                                ) : (
                                  <UserCircleIcon className="w-8 h-8 text-gray-400" />
                                )}
                              </div>
                            ))}
                          </div>
                        </button>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* Region - Only show for games that use regions */}
            {criteria.showRegion && (
              <div className="flex flex-col gap-2">
                <label className="text-cyan-400 font-semibold">Region</label>
                <select
                  value={formData.region}
                  onChange={(e) => handleChange("region", e.target.value)}
                  className="bg-[#2e3354] border border-[#4b86e1] text-white p-3 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="">Select region</option>
                  {criteria.regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Match Type */}
            <div className="flex flex-col gap-2">
              <label className="text-cyan-400 font-semibold">Match Type</label>
              <select
                value={formData.matchType}
                onChange={(e) => handleChange("matchType", e.target.value)}
                className="bg-[#2e3354] border border-[#4b86e1] text-white p-3 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
              >
                <option value="">Select match type</option>
                {criteria.matchTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Creating...' : 'Create Match'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-semibold rounded-lg hover:from-gray-600 hover:to-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationDialog
          isOpen={showConfirmation}
          onConfirm={handleSubmit}
          onCancel={() => setShowConfirmation(false)}
          matchDetails={formData}
        />
      )}
    </div>
  );
}
