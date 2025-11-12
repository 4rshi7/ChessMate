// src/sections/RightPanel.tsx
import React from 'react';
import GameControls from './GameControls';
import { useGameStore } from '../store/gameStore';

export default function GameRightPanel() {
  const { gameId, status, resetGame } = useGameStore();

  const resign = useGameStore((state)=>state.resign);

  // Placeholder for game info, replace with actual data from your store
  const gameInfo = {
    timeControl: "5 + 0",
    gameType: "Rated Blitz",
    opening: "e4 e5"
  };

  const handleOfferDraw = () => {
    alert("Draw offered!");
    // Implement actual draw offer logic here (e.g., send to server)
  };

  const handleResign = () => {
       console.log("resign")
    if (window.confirm("Are you sure you want to resign?")) {
      alert("You resigned!");
      // Implement actual resign logic here (e.g., send to server, end game)
      resign(); 
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
        gameInfo = {gameInfo}
      />
    </div>
  );
}