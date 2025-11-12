import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore'; 


export default function GameOverModal() {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  const gameStatus = useGameStore((state) => state.status);
  const resetGame = useGameStore((state) => state.resetGame);
  const gameResult = useGameStore((state) => state.result); 
  const playerColor = useGameStore((state)=>state.playerColor);


  useEffect(() => {
    if (gameStatus === 'finished') {
      setIsOpen(true);
    }
  }, [gameStatus]);



  const handleLeaveHome = () => {
    setIsOpen(false); 
    resetGame();
    navigate('/home'); 
  };

  const handleStartAnother = () => {
    setIsOpen(false); 
    resetGame();      
    navigate('/queue'); 
  };

  const handleCancel = () => {
    setIsOpen(false);
  };


  if (!isOpen) {
    return null;
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60  p-8 ">
      <div className="relative w-full max-w-md rounded-lg bg-white  p-6 shadow-xl shadow-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center w-full">Game Over</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            {/* A simple 'X' icon */}
            <svg className="h-6 w-6 absolute top-4 right-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {gameResult===playerColor?
          (<div className="text-2xl font-semibold text-green-500 text-center">You Won</div>):
          (<div className="text-2xl font-semibold text-red-500 text-center">You Lost</div>)
        }

        {/* Actions */}
        <div className="flex flex-col space-y-3 mt-4">
          <button
            onClick={handleStartAnother}
            className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Start Another Game
          </button>
          <button
            onClick={handleLeaveHome}
            className="flex w-full items-center justify-center rounded-md bg-gray-600 px-4 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            Leave to Home Page
          </button>
        </div>
      </div>
      </div>
    
  );
}