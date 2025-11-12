import {useEffect} from 'react';
import GameLeftPanel from '../components/GameLeftPanel';
import GameRightPanel from '../components/GameRightPanel';
import ChessBoard from '../components/ChessBoard'; 
import { useGameStore } from '../store/gameStore'; 
import { useParams } from 'react-router-dom';
import { connectToGameSocket, disconnectGameSocket } from '../services/socket';
import GameOverModal from '../components/GameOverModal';

export default function Game() {
  

  // const { paramGameId } = useParams<{ gameId: string }>();

  // change this later 
  const status = useGameStore((state)=> state.status);
  const joinRoom = useGameStore((state)=>state.joinRoom);
  // const gameId = useGameStore((state)=>state.gameId);
  const { gameId } = useParams<{ gameId: string }>();



  // Initialize a game when the component mounts if not already active
  useEffect(() => {
    async function connection(){
       const socket = await connectToGameSocket("http://localhost:4001");
       if(gameId){
            joinRoom(socket,gameId);
        }
    }
    connection();

   

   return () => {
      disconnectGameSocket();
      // Optionally, you could reset the game state
      // useGameStore.getState().resetGame();
    };
  }, [gameId]);



  return (
    <>
    <div className=" relative flex justify-center items-center bg-gray-200 ">
      <GameOverModal/>
      <div className="flex w-full px-28 py-8 space-x-6 ">
        {/* Left Column */}
        <div className="w-1/4 shrink-0 bg-white shadow-md rounded-2xl ">
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
    </>
  );
}