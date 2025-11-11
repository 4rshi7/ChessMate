import {useEffect} from 'react';
import GameLeftPanel from '../components/GameLeftPanel';
import GameRightPanel from '../components/GameRightPanel';
import ChessBoard from '../components/ChessBoard'; 
import { useGameStore } from '../store/gameStore'; 

export default function Game() {
  const { status, gameId, initGame } = useGameStore();

  // Initialize a game when the component mounts if not already active
  useEffect(() => {
    if (status === 'idle') {
      // You might get a game ID from a server or generate one
      initGame("game_123"); 
    }
  }, [status, gameId, initGame]);

  return (
    <div className=" flex justify-center items-center bg-gray-200">
      <div className="flex w-full px-28 py-8 space-x-6">
        {/* Left Column */}
        <div className="w-1/4 shrink-0 bg-white shadow-md rounded-2xl">
          <GameLeftPanel />
        </div>

        {/* Middle Column (Chessboard) */}
        <div className="grow flex items-center justify-center min-w-0 rounded-2xl  p-4 bg-white shadow-md ">
          <ChessBoard />
        </div>

        {/* Right Column */}
        <div className="w-1/4 shrink-0 bg-white shadow-md rounded-2xl">
          <GameRightPanel/>
        </div>
      </div>
    </div>
  );
}