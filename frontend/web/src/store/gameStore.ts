
import { create } from 'zustand';
import { Chess, Move } from 'chess.js'; 

type Clocks = { white: number; black: number };

const START_POS = new Chess().fen();

export type GameState = {
  gameId?: string | null;
  fen: string;
  moves: string[]; // Stores SAN 
  clocks: Clocks;
  status: 'idle' | 'waiting' | 'active' | 'finished';
  initGame: (gameId: string, fen?: string, clocks?: Clocks) => void;
  makeMove: (move: { from: string; to: string; promotion?: string }) => boolean; // true if legal false o/w
  resetGame: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  gameId: null,
  fen: START_POS,
  moves: [],
  clocks: { white: 0, black: 0 },
  status: 'idle',

  initGame: (gameId, fen = START_POS, clocks = { white: 300, black: 300 }) =>
    set({ gameId, fen, clocks, moves: [], status: 'active' }),
  makeMove: (move) => {
    const { fen, moves } = get();
    
    const game = new Chess(fen);
    
    let result: Move | null = null;
    
    try {
      result = game.move(move);
    } catch (e) {
      console.error("Error making move:", e);
      return false; 
    }

    if (result === null) {
      return false; 
    }
    set({
      fen: game.fen(),
      moves: [...moves, result.san],
    });
    
    return true; 
  },

  resetGame: () =>
    set({
      gameId: null,
      fen: START_POS,
      moves: [],
      clocks: { white: 0, black: 0 },
      status: 'idle',
    }),
}));