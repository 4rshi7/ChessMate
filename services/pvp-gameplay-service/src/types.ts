export interface GameState {
    gameID: string,
    fen: string,
    whitePlayer: string,
    blackPlayer: string,
    whiteClock: number,
    blackClock: number,
    increment: number,
    status: "ready" | "active" | "finished",    //ready: when game is ready but both players not connected
    moves: string
}
