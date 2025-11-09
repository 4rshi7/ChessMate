import { Chessboard } from "react-chessboard";
import { Chess } from 'chess.js'

const chess = new Chess();

export default function Game(){
  const chessboardOptions = {
    // your config options here
  };
   return <Chessboard options={chessboardOptions} />;
}