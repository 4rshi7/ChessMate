import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import PlayerInfo from './PlayerInfo';
import MoveHistory from './MoveHistory';
import { Chess } from 'chess.js'; // To determine player turn
import { useUserStore } from '../store/userStore';
import { IoIosList } from 'react-icons/io';

export default function GameLeftPanel() {
  const { fen, moves } = useGameStore();
  const game = new Chess(fen); // Create a temporary instance to check turn
  let isMyTurn = false;

  const user = useUserStore((state)=> state.user);

  let myRating = 1400;
  if(user?.ratings?.blitz){
    myRating = user.ratings.blitz;
  }
  let myUserName = "You";
  if(user?.username){
    myUserName = user.username;
  }

  const playerColor = useGameStore((state)=> state.playerColor);
  const oppColor = playerColor==="white" ?"black" : "white";

  const currTurn =  playerColor==="white" ? "w" : "b";
  if(game.turn()===currTurn){
    isMyTurn = true;
  }

  // opp details

  const opponentUsername = useGameStore((state)=>state.opponentUsername);
  const opponentRating = useGameStore((state)=>state.opponentRating);

  return (
    <div className="flex flex-col justify-between h-full  ">
      {/* Top Player (e.g., Opponent) */}
      <div className='shrink-0'>
      <PlayerInfo
        playerName={opponentUsername}
        rating={opponentRating}
        color={oppColor}
        isTurn={!isMyTurn}
      />
      </div>

      {/* Move History */}

      <div className=" rounded-lg  text-sm grow mt-6 ">
        <div className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2 px-4">
        <IoIosList />
        Move History
      </div>
        <div className='grow h-96 min-h-0 overflow-y-auto'>
        <MoveHistory moves={moves} />
        </div>
      </div>

      {/* Bottom Player (You) */}
      <div className='shrink-0'>
      <PlayerInfo
        playerName={myUserName}
        rating={myRating}
        color={playerColor}
        isTurn={isMyTurn}
      />
      </div>
    </div>
  );
}