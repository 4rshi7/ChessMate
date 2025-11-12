
import { create } from 'zustand';
import { Chess, Move } from 'chess.js';
import { sendGameSocket } from "../services/socket";
import { useAuthStore } from './authStore';
import { Socket } from 'socket.io-client';

type Clocks = { white: number; black: number };

const START_POS = new Chess().fen();

export type GameState = {
  gameId?: string | null;
  fen: string;
  moves: string[]; // Stores SAN 
  clocks: Clocks;
  status: 'ready' | 'waiting' | 'active' | 'finished';
  playerColor: 'white' | 'black' ;
  opponentUsername: string;
  opponentRating: number;
  result: string;
  terminationType:string;
  initGame: (gameId: string, fen?: string,playerColor?: 'white' | 'black', clocks?: Clocks,opponentRating?:number,opponentUsername?:string) => void;
  joinRoom: (socket: Socket, gameId: string) => void;
  makeMove: (move: { from: string; to: string; promotion?: string }) => boolean; // true if legal false o/w
  resetGame: () => void;
  updateFromServer: (update: { fen: string; lastMove: string; clocks: Clocks }) => void;
  handleGameOver: (result: string, terminationType:string) => void;
  resign:()=> void;
};

export const useGameStore = create<GameState>((set, get) => ({
  gameId: null,
  fen: START_POS,
  playerColor: "white",
  moves: [],
  clocks: { white: 300000, black: 300000 },
  status: 'waiting',
  opponentUsername:"",
  opponentRating: 0,
  result:"",
  terminationType: "",
  
  
  initGame: (gameId, fen = START_POS, playerColor: 'white' | 'black' = 'white', clocks = { white: 300000, black: 300000 }, opponentRating,opponentUsername) =>
    set({ gameId, fen,playerColor, clocks, moves: [], status: 'ready',opponentRating,opponentUsername }),
  joinRoom: (socket, gameId) => {
    try {
      const token = useAuthStore.getState().token;
      // change this maybe 
      // socket.emit("joinRoom", {authToken: token, gameId});
      sendGameSocket("joinRoom", {authToken: token, gameId }); 
      console.log("🔗 Joining game room:", gameId);
      set({ gameId, status: 'waiting' });
    } catch (err) {
      console.error("Error joining room:", err);
    }
  },

  makeMove: (move) => {
    const { fen, moves, gameId, playerColor } = get();
    const game = new Chess(fen);
    let result: Move | null = null;

    const turn = game.turn(); // 'w' or 'b'
    if (
      (turn === 'w' && playerColor !== 'white') ||
      (turn === 'b' && playerColor !== 'black')
    ) {
      console.log("Not your turn!");
      return false; // Not your turn
    }
    try {
      result = game.move(move);
    } catch (e) {
      console.error("Error making move:", e);
      return false;
    }

    if (result === null) {
      return false;
    }
    const newFen = game.fen();
    set({
      fen: newFen,
      moves: [...moves, result.san],
    });

     if (gameId) {
      try {
        sendGameSocket("makeMove", { gameId, from: move.from, to: move.to });
        console.log("📤 Move sent to server:", move);
      } catch (err) {
        console.error("Failed to send move:", err);
      }
    }

    return true;
  },

  resetGame: () =>
    set({
      gameId: null,
      fen: START_POS,
      moves: [],
      clocks: { white: 0, black: 0 },
      status: 'waiting',
    }),
  updateFromServer: (update) => {
    set((state) => {
      const lastMoveInState = state.moves[state.moves.length - 1];
        if (lastMoveInState === update.lastMove) {
          return { clocks: update.clocks };
        }
      return{
      fen: update.fen,
      moves: [...state.moves, update.lastMove],
      clocks: update.clocks,
      }
    });
  },

  handleGameOver: (result:string,terminationType:string) => {
    set({ status: 'finished' , terminationType: terminationType , result: result});
    console.log("Game Over:", result);
  },

  resign : ()=>{
    console.log("inside gameStore's Resign")
    sendGameSocket("resign",{});
  }

}));