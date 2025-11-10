import { Chessboard} from "react-chessboard";
import { useGameStore } from "../store/gameStore"; // Adjust path as needed

export default function ChessBoard() {
  // 1. Get the current FEN and the makeMove action from the store.
  const fen = useGameStore((state) => state.fen);
  const makeMove = useGameStore((state) => state.makeMove);
  const resetGame = useGameStore((state) => state.resetGame);


  function onPieceDrop(sourceSquare: string, targetSquare: string, piece : string) {
    // 2. Create the move object.
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1]?.toLowerCase() ?? "q",  // don't understand ts 
    };

    const successfulMove = makeMove(move); // boolean

    // if false piece goes back to it's original postion
    return successfulMove;
  }

  return (
    <div className="w-full">
      <Chessboard
        position={fen}
        onPieceDrop={onPieceDrop}
      />
      <button onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}