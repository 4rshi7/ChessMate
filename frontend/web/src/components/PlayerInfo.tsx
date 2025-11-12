// src/components/PlayerInfo.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../store/gameStore';

interface PlayerInfoProps {
  playerName: string;
  rating: number;
  color: 'white' | 'black';
 
  isTurn: boolean;
}

export default function PlayerInfo({ playerName, rating, color, isTurn }: PlayerInfoProps) {
  const avatarBg = color === 'white' ? 'bg-gray-200' : 'bg-gray-700';
  const avatarText = color === 'white' ? 'text-gray-800' : 'text-white';
  const borderColor = isTurn ? 'border-blue-500 bg-blue-200' : 'border-transparent';
  const status = useGameStore((state)=>state.status);

     //timer implementation 

     function formatTime(ms: number): string {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

interface PlayerTimerProps {
  player: 'white' | 'black';
}

const authoritativeTime = useGameStore((state) => state.clocks[color]);
 const [displayTime, setDisplayTime] = useState(authoritativeTime);

const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayTime(authoritativeTime);
  }, [authoritativeTime]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isTurn) {
      intervalRef.current = setInterval(() => {
        // Tick down the local displayTime
        setDisplayTime((prevTime) => Math.max(0, prevTime - 1000));
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTurn,])

  return (
    <div className={`flex items-center justify-between space-x-3  p-3 rounded-lg border-2 ${borderColor}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold ${avatarBg} ${avatarText}`}>
        {playerName[0]}
      </div>
      <div className="grow">
        <div className="text-sm font-semibold">{playerName}</div>
        <div className="text-xs text-gray-400">Rating: {rating}</div>
      </div>
      {status === "finished" ? (
  <div className="text-xl font-bold">00:00</div>
) : (
  <div className="text-xl font-bold">{formatTime(displayTime)}</div>
)}
      
      
    </div>
  );
}