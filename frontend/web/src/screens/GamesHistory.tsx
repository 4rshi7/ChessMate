import React, { useEffect, useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  MinusCircle, 
  Zap, 
  Rocket, 
  Clock, 
  Turtle 
} from 'lucide-react'; // Using lucide for icons
import { useUserStore } from '../store/userStore';

// --- DATA MODELS (from your request) ---

export interface Game {
  id: string;
  gameServiceId: string;
  opponentAuthId: string;
  opponentUsername: string;
  opponentRating: number;
  userColor: "WHITE" | "BLACK";
  result: "WIN" | "LOSS" | "DRAW";
  timeControl: "BLITZ" | "RAPID" | "CLASSICAL" | "BULLET";
  playedAt: string;
}

export interface User {
  id: string;
  authUserId: string;
  username: string;
  displayName: string;
  photoUrl?: string;
  country?: string;
  status: string;
  dateJoined: string;
  preferences?: Record<string, unknown>;
  // ... other user props
  gameHistory?: Game[];
}






export default function GameHistoryPage() {
  // We use mock data here, but you could fetch this
  const user = useUserStore((state)=>state.user);
  const fetchInfo = useUserStore((state)=> state.fetchUserInfo);
  const [gameHistory, setGameHistory] = useState<Game[]>(user?.gameHistory || [] );
  useEffect(()=>{
     async function awaitFetch(){
      await fetchInfo();
      setGameHistory(user?.gameHistory || []);
     }

     awaitFetch();
   
   
  },[user]);
  console.log(gameHistory);

  // --- HELPER FUNCTIONS ---

  /**
   * Formats an ISO date string into a readable format.
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  /**
   * Returns Tailwind classes and an icon based on the game result.
   */
  const getResultVisuals = (result: Game['result']) => {
    switch (result) {
      case 'WIN':
        return {
          icon: <CheckCircle className="w-5 h-5 mr-2" />,
          color: 'text-green-600',
        };
      case 'LOSS':
        return {
          icon: <XCircle className="w-5 h-5 mr-2" />,
          color: 'text-red-600',
        };
      case 'DRAW':
        return {
          icon: <MinusCircle className="w-5 h-5 mr-2" />,
          color: 'text-gray-500',
        };
    }
  };

  /**
   * Returns a small icon representing the time control.
   */
  const getTimeControlIcon = (timeControl: Game['timeControl']) => {
    switch (timeControl) {
      case 'BULLET':
        return <Rocket className="w-4 h-4 mr-1.5" title="Bullet" />;
      case 'BLITZ':
        return <Zap className="w-4 h-4 mr-1.5" title="Blitz" />;
      case 'RAPID':
        return <Clock className="w-4 h-4 mr-1.5" title="Rapid" />;
      case 'CLASSICAL':
        return <Turtle className="w-4 h-4 mr-1.5" title="Classical" />;
    }
  };

  /**
   * Returns a small visual for the player's color.
   */
  const getUserColorIcon = (color: Game['userColor']) => {
    const colorClass = color === 'WHITE' ? 'bg-white' : 'bg-gray-800';
    return (
      <div
        title={`Played as ${color}`}
        className={`w-4 h-4 rounded-full border border-gray-400 ${colorClass}`}
      />
    );
  };

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-inter">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Game History</h1>

        {/* Game History List Container */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* We use a <ul> instead of <table> for better responsive 
            control on mobile, but a table would also be a good choice.
          */}
          <ul className="divide-y divide-gray-200">
            {gameHistory.length > 0 ? (
              gameHistory.map((game) => {
                const resultVisuals = getResultVisuals(game.result);
                return (
                  <li
                    key={game.id}
                    className="p-4 md:p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      
                      {/* Left Side: Opponent and Result */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-2 md:mb-0">
                          {/* Result Icon and Text */}
                          <div className={`flex items-center text-lg font-bold ${resultVisuals.color}`}>
                            {resultVisuals.icon}
                            <span>{game.result}</span>
                          </div>
                          
                          {/* Opponent Info */}
                          <div className="ml-4 text-gray-800">
                            <span className="font-semibold">{game.opponentUsername}</span>
                            <span className="text-gray-500 text-sm"> ({game.opponentRating})</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Type, Date, and Action */}
                      <div className="flex-shrink-0 flex flex-col md:flex-row md:items-center md:space-x-6 mt-3 md:mt-0">
                        
                        {/* Game Type */}
                        <div className="flex items-center text-gray-600 mb-2 md:mb-0" title={`${game.timeControl} game as ${game.userColor}`}>
                          {getTimeControlIcon(game.timeControl)}
                          <span className="text-sm font-medium mr-2">{game.timeControl}</span>
                          {getUserColorIcon(game.userColor)}
                        </div>

                        {/* Date Played */}
                        <div className="text-sm text-gray-500 mb-3 md:mb-0">
                          {formatDate(game.playedAt)}
                        </div>

                        {/* Action Button */}
                        <div>
                          
                        </div>
                      </div>

                    </div>
                  </li>
                );
              })
            ) : (
              <li className="p-6 text-center text-gray-500">
                You have no games in your history yet.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}