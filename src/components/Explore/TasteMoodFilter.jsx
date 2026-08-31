import React from 'react';
import { tasteMoodCategories } from './snacksData';

const TasteMoodFilter = ({ activeMood, onSelectMood }) => {
  return (
    <div className="bg-gradient-to-r from-stone-900 via-[#083358] to-stone-900 rounded-3xl p-3.5 sm:p-4 text-white shadow-md border border-stone-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-black font-brand text-amber-300">
            What are you craving today?
          </span>
          <span className="hidden sm:inline text-xs text-stone-300">
            • Filter by taste profile & occasion
          </span>
        </div>
      </div>

      {/* Mood Pills */}
      <div 
        className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tasteMoodCategories.map((mood) => {
          const isActive = activeMood === mood.id;
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => onSelectMood(mood.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#ffd25d] text-stone-950 shadow-sm scale-105 font-black ring-2 ring-white/30'
                  : 'bg-white/10 hover:bg-white/20 text-stone-200 border border-white/15'
              }`}
            >
              <span className="text-sm">{mood.emoji}</span>
              <span>{mood.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TasteMoodFilter;
