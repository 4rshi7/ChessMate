// stores/gameStore.ts
import { create } from 'zustand';
import { Chess } from 'chess.js';

type Clocks = { white: number; black: number };

type GameState = {
  gameId?: string | null;
  fen: string;
  moves: string[];
  clocks: Clocks;
  status: 'idle' | 'waiting' | 'active' | 'finished';
  initGame: (gameId: string, fen?: string, clocks?: Clocks) => void;
  addMove: (san: string, newFen: string) => void;
  resetGame: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  gameId: null,
  fen: 'startpos',
  moves: [],
  clocks: { white: 0, black: 0 },
  status: 'idle',
  initGame: (gameId, fen = 'startpos', clocks = { white: 300, black: 300 }) =>
    set({ gameId, fen, clocks, moves: [], status: 'active' }),  
  addMove: (san, newFen) =>
    set((state) => ({ moves: [...state.moves, san], fen: newFen })),
  resetGame: () =>
    set({ gameId: null, fen: 'startpos', moves: [], clocks: { white: 0, black: 0 }, status: 'idle' }),
}));
