// src/sections/LeftPanel.tsx
import React from 'react';
import { useGameStore } from '../store/gameStore';
import PlayerInfo from './PlayerInfo';
import MoveHistory from './MoveHistory';
import { Chess } from 'chess.js'; // To determine player turn

export default function GameLeftPanel() {
  const { fen, moves } = useGameStore();
  const game = new Chess(fen); // Create a temporary instance to check turn
  const isWhiteTurn = game.turn() === 'w';
  const isBlackTurn = game.turn() === 'b';

  return (
    <div className="flex flex-col space-y-4">
      {/* Top Player (e.g., Black) */}
      <PlayerInfo
        playerName="Magnus_C"
        rating={2847}
        color="black"
        time="15:06" // This would eventually come from your store/game logic
        isTurn={isBlackTurn}
      />

      {/* Move History */}
      <div className=" rounded-lg p-3 text-sm h-72 overflow-y-auto">
        <MoveHistory moves={moves} />
      </div>

      {/* Bottom Player (You) */}
      <PlayerInfo
        playerName="You"
        rating={2156}
        color="white"
        time="14:18" // This would eventually come from your store/game logic
        isTurn={isWhiteTurn}
      />
    </div>
  );
}