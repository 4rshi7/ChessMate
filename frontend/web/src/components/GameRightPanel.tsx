// src/sections/RightPanel.tsx
import React from 'react';
import GameControls from './GameControls';
import { useGameStore } from '../store/gameStore';

export default function GameRightPanel() {
  const { gameId, status, resetGame } = useGameStore();

  // Placeholder for game info, replace with actual data from your store
  const gameInfo = {
    timeControl: "15+10",
    gameType: "Rated Rapid",
    opening: "Ruy Lopez",
  };

  const handleOfferDraw = () => {
    alert("Draw offered!");
    // Implement actual draw offer logic here (e.g., send to server)
  };

  const handleResign = () => {
    if (window.confirm("Are you sure you want to resign?")) {
      alert("You resigned!");
      // Implement actual resign logic here (e.g., send to server, end game)
      resetGame(); // Example: reset game after resign
    }
  };

  const handleLeaveGame = () => {
    if (window.confirm("Are you sure you want to leave the game?")) {
      alert("You left the game!");
      // Implement actual leave game logic here
      resetGame(); // Example: reset game after leaving
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 text-center mt-2">Game Controls</h2>
      <GameControls
        onOfferDraw={handleOfferDraw}
        onResign={handleResign}
        onLeaveGame={handleLeaveGame}
        gameInfo={gameInfo}
        status={status}
      />
    </div>
  );
}