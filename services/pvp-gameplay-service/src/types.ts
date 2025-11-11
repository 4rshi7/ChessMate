export interface GameState {
    gameID: string,
    fen: string,
    whitePlayer: string,
    blackPlayer: string,
    whiteClock: number,
    blackClock: number,
    increment: number,
    status: "ready" | "active" | "finished",    //ready: when game is ready but both players not connected
    moves: string,
    whiteRating: number,
    blackRating: number,
    whiteUsername: string,
    blackUsername: string,
    lastMoveTimestamp?: number
}

export type TerminationType = "CHECKMATE" | "STALEMATE" | "TIMEOUT" | "RESIGNATION" | "AGREED_DRAW";

export type ResultType = "white" | "black" | "draw";
