// src/components/GameControls.tsx
import React from 'react';
import { GameState } from '../store/gameStore'; 

interface GameControlsProps {
  onOfferDraw: () => void;
  onResign: () => void;
  onLeaveGame: () => void;
  gameInfo: {
    timeControl: string;
    gameType: string;
    opening: string;
  };
  status: GameState['status']; // Use the status type from your store
}

export default function GameControls({ onOfferDraw, onResign, onLeaveGame, gameInfo, status }: GameControlsProps) {
  const isGameActive = status === 'active';

  return (
    <div className=" rounded-lg p-4 flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <button
          className="w-full py-2 rounded-md bg-gray-600 hover:bg-gray-500 text-white font-semibold flex items-center justify-center space-x-2"
          onClick={onOfferDraw}
          disabled={!isGameActive}
        >
          {/* <FaHandshake className="text-lg" /> */} {/* Add an icon library like react-icons */}
          <span>Offer Draw</span>
        </button>
        <button
          className="w-full py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center space-x-2"
          onClick={onResign}
          disabled={!isGameActive}
        >
          {/* <FaFlag className="text-lg" /> */}
          <span>Resign</span>
        </button>
        <button
          className="w-full py-2 rounded-md bg-yellow-600 hover:bg-yellow-700 text-white font-semibold flex items-center justify-center space-x-2"
          onClick={onLeaveGame}
          disabled={!isGameActive}
        >
          {/* <FaSignOutAlt className="text-lg" /> */}
          <span>Leave Game</span>
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="text-md font-semibold text-gray-800">Game Info</h3>
        <div className="text-sm text-gray-800 space-y-1">
          <div className="flex justify-between">
            <span>Time Control:</span>
            <span className="font-medium">{gameInfo.timeControl}</span>
          </div>
          <div className="flex justify-between">
            <span>Game Type:</span>
            <span className="font-medium">{gameInfo.gameType}</span>
          </div>
          <div className="flex justify-between">
            <span>Opening:</span>
            <span className="font-medium">{gameInfo.opening}</span>
          </div>
        </div>
      </div>
    </div>
  );
}