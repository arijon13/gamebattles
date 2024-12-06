"use client";

import { useState, useCallback } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface GameFiltersProps {
  regions: string[];
  teamSizes: string[];
  matchTypes: string[];
  onFilterChange: (filters: { 
    region: string; 
    teamSize: string; 
    matchType: string;
    minAmount: number;
    maxAmount: number;
  }) => void;
}

export default function GameFilters({
  regions,
  teamSizes,
  matchTypes,
  onFilterChange,
}: GameFiltersProps) {
  const [filters, setFilters] = useState({
    region: "",
    teamSize: "",
    matchType: "",
    minAmount: 0,
    maxAmount: 10000,
  });

  const handleFilterChange = useCallback((field: string, value: any) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  }, [filters, onFilterChange]);

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setFilters(prev => ({
        ...prev,
        minAmount: value[0],
        maxAmount: value[1]
      }));
      onFilterChange({
        ...filters,
        minAmount: value[0],
        maxAmount: value[1]
      });
    }
  };

  const formatAmount = (amount: number) => {
    if (amount >= 10000) {
      return "10000+";
    }
    return `$${amount}`;
  };

  const handleInputChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    const validValue = Math.min(Math.max(numValue, 0), 10000);
    
    if (type === 'min') {
      const newMin = Math.min(validValue, filters.maxAmount);
      handleSliderChange([newMin, filters.maxAmount]);
    } else {
      const newMax = Math.max(validValue, filters.minAmount);
      handleSliderChange([filters.minAmount, newMax]);
    }
  };

  const CustomSelect = ({ 
    options, 
    value, 
    onChange, 
    placeholder,
    icon
  }: {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    icon?: React.ReactNode;
  }) => (
    <div className="relative min-w-[200px]">
      <select
        className="w-full appearance-none bg-gradient-to-r from-[#2a2f48] to-[#1f2236] 
                   text-white px-4 py-3 rounded-xl border border-[#3d4674] shadow-lg
                   focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                   transition-all duration-200 ease-in-out
                   hover:border-cyan-400 cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" className="bg-[#1f2236]">
          {placeholder}
        </option>
        {options.map((option) => (
          <option 
            key={option} 
            value={option}
            className="bg-[#1f2236] py-2"
          >
            {option}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400 pointer-events-none" />
      {icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="bg-gradient-to-r from-[#1a1d31] to-[#2e3354] p-6 rounded-xl 
                      shadow-xl border border-[#3d4674] backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 
                         bg-clip-text text-transparent">
            Match Filters
          </h3>
          <button
            onClick={() => {
              setFilters({ region: "", teamSize: "", matchType: "", minAmount: 0, maxAmount: 10000 });
              onFilterChange({ region: "", teamSize: "", matchType: "", minAmount: 0, maxAmount: 10000 });
            }}
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors
                       px-3 py-1 rounded-lg border border-cyan-400/30 hover:border-cyan-400
                       bg-cyan-400/10 hover:bg-cyan-400/20"
          >
            Reset Filters
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          <CustomSelect
            options={regions}
            value={filters.region}
            onChange={(value) => handleFilterChange("region", value)}
            placeholder="All Regions"
          />

          <CustomSelect
            options={teamSizes}
            value={filters.teamSize}
            onChange={(value) => handleFilterChange("teamSize", value)}
            placeholder="All Team Sizes"
          />

          <CustomSelect
            options={matchTypes}
            value={filters.matchType}
            onChange={(value) => handleFilterChange("matchType", value)}
            placeholder="All Match Types"
          />

          <div className="w-full mt-4">
            <label className="block text-sm font-medium text-cyan-400 mb-2">
              Wager Amount
            </label>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="number"
                placeholder="Min amount"
                value={filters.minAmount || ''}
                onChange={(e) => handleInputChange('min', e.target.value)}
                className="w-32 px-3 py-2 bg-[#2a2f48] text-white rounded-lg border border-[#3d4674]
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                min="0"
                max="10000"
              />
              <span className="text-cyan-400">-</span>
              <input
                type="number"
                placeholder="Max amount"
                value={filters.maxAmount === 10000 ? '' : filters.maxAmount || ''}
                onChange={(e) => handleInputChange('max', e.target.value)}
                className="w-32 px-3 py-2 bg-[#2a2f48] text-white rounded-lg border border-[#3d4674]
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                min="0"
                max="10000"
              />
            </div>
            <Slider
              range
              min={0}
              max={10000}
              value={[filters.minAmount, filters.maxAmount]}
              onChange={handleSliderChange}
              trackStyle={[{ backgroundColor: '#00e7ff' }]}
              handleStyle={[{ borderColor: '#00e7ff' }, { borderColor: '#00e7ff' }]}
              railStyle={{ backgroundColor: '#3d4674' }}
              step={5}
            />
            <div className="flex justify-between text-xs text-cyan-400 mt-2">
              <span>Min: ${filters.minAmount}</span>
              <span>Max: {formatAmount(filters.maxAmount)}</span>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.region || filters.teamSize || filters.matchType || filters.minAmount !== 0 || filters.maxAmount !== 10000) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.region && (
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                {filters.region}
              </span>
            )}
            {filters.teamSize && (
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                {filters.teamSize}
              </span>
            )}
            {filters.matchType && (
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                {filters.matchType}
              </span>
            )}
            {(filters.minAmount !== 0 || filters.maxAmount !== 10000) && (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                ${filters.minAmount} - {formatAmount(filters.maxAmount)}
              </span>
            )}
          </div>
        )}
      </div>

      <style>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </>
  );
}
