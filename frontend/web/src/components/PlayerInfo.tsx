// src/components/PlayerInfo.tsx
import React from 'react';

interface PlayerInfoProps {
  playerName: string;
  rating: number;
  color: 'white' | 'black';
  time: string;
  isTurn: boolean;
}

export default function PlayerInfo({ playerName, rating, color, time, isTurn }: PlayerInfoProps) {
  const avatarBg = color === 'white' ? 'bg-gray-200' : 'bg-gray-700';
  const avatarText = color === 'white' ? 'text-gray-800' : 'text-white';
  const borderColor = isTurn ? 'border-blue-500' : 'border-transparent';

  return (
    <div className={`flex items-center space-x-3  p-3 rounded-lg border-2 ${borderColor}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold ${avatarBg} ${avatarText}`}>
        {playerName[0]}
      </div>
      <div className="grow">
        <div className="text-sm font-semibold">{playerName}</div>
        <div className="text-xs text-gray-400">Rating: {rating}</div>
      </div>
      <div className="text-xl font-bold">{time}</div>
      {isTurn && (
        <span className="text-xs text-blue-300 ml-2">Your turn</span> // Simplified turn indicator
      )}
    </div>
  );
}