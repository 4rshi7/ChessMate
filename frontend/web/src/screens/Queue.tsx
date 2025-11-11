import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { connectToNotifSocket, disconnectNotifSocket } from '../services/socket';
import { useGameStore } from '../store/gameStore';

const Queue = () => {
  const gameId = useGameStore((state) => state.gameId);
const status = useGameStore((state) => state.status);

  const navigate = useNavigate();

  useEffect(()=>{
    connectToNotifSocket("http://localhost:4002");

    // return () => {
    //   console.log("Unmounting Queue, disconnecting...");
    //   disconnectNotifSocket();
    // };
  },[])

  console.log( "gameId " ,gameId);
  console.log("status ", status);

  useEffect(()=>{

    if(status ==="ready" && gameId){
      alert("navigating to game");
      navigate(`/game/${gameId}`);
    }
  },[status, gameId])
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Finding Opponent...</h2>
        <p className="text-gray-400">Please wait.</p>
        {/*  */}
        <button 
          onClick={() => navigate('/home')} // Cancel button
          className="mt-6 px-4 py-2 bg-red-600 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Queue