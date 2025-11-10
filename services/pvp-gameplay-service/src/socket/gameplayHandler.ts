import { type Server, type Socket } from 'socket.io';
import { redisClient} from "../lib/redis-client.js";
import {Chess} from "chess.js";

export const onConnection = async (io: Server, socket: Socket) => {
    const userId = (socket as any).user.id;
    console.log(`User ${userId} connected with socket ${socket.id}`);

    socket.on('joinRoom', async (gameId: string) => {
        console.log(`User ${userId} joining room for game ${gameId}`);
        const game = await redisClient.hGetAll(`game:match:${gameId}`);

        if(!game || (userId !== game.blackPlayer && userId !== game.whitePlayer)) {
            console.log(`User ${userId} is not a participant in game ${gameId}. Disconnecting.`);
            socket.disconnect();
            return;
        }

        socket.data.gameId = gameId;
        socket.join(gameId);
        console.log(`User ${userId} joined room for game ${gameId}`);
    });

    socket.on('makeMove', async (moveData: {gameId: string, from: string, to: string}) => {
        const { gameId, from, to } = moveData;
        const userId = (socket as any).user.id;

        console.log(`User ${userId} making move in game ${gameId} from ${from} to ${to}`);


        if(!gameId){
            console.log("You haven't joined a game.")
        }

        const game = await redisClient.hGetAll(`game:match:${gameId}`);

        const chess = new Chess(game.fen);

        const turn = chess.turn();
        if ((turn === 'w' && userId !== game.whitePlayer) ||
            (turn === 'b' && userId !== game.blackPlayer)) {
            return socket.emit('gameError', 'It is not your turn');
        }

        let moveResult;
        try{
            moveResult = chess.move({from, to});
        }catch (err){
            console.log("Invalid Move");
            return socket.emit('gameError', 'Invalid move');
        }

        const newFen = chess.fen();
        const oldMovesList = JSON.parse(game.moves || '[]');
        oldMovesList.push(moveResult.san);  // Standard Algebraic Notation

        const newMovesString = JSON.stringify(oldMovesList);

        const isGameOver = chess.isGameOver();

        const newStatus = isGameOver ? 'finished' : 'active';
        let newClockValue;

        const timeElapsed = Date.now() - parseInt(game.lastMoveTimestamp || '0');

        if(turn === 'b'){
            newClockValue = parseInt(game.blackClock || '0') - timeElapsed;
        }else{
            newClockValue = parseInt(game.whiteClock || '0') - timeElapsed;
        }

        console.log("clock: ", newClockValue);

        if(newClockValue <= 0){
            // This player ran out of time.
            const winner = (turn === 'w') ? 'black' : 'white';
            io.to(gameId).emit('gameOver', { result: 'Timeout', winner: winner });

            // Save the game, but with the timeout result
            // await saveCompletedGame(gameId, game.moves, winner, "Timeout");
            return;
        }

        let newBlackClock = parseInt(game.blackClock || '0');
        let newWhiteClock = parseInt(game.whiteClock || '0');

        if(turn === 'b'){
            newBlackClock = newClockValue;
        }else{
            newWhiteClock = newClockValue;
        }

        await redisClient.hSet(`game:match:${gameId}`, {
            fen: newFen,
            moves: newMovesString,
            status: newStatus,
            blackClock: newBlackClock,
            whiteClock: newWhiteClock,
            lastMoveTimestamp: Date.now()
        });

        io.to(gameId).emit('gameStateUpdate', {
            fen: newFen,
            lastMove: moveResult.san,
            clocks: {
                blackClock: newBlackClock,
                whiteClock: newWhiteClock
            }
        });

        // --- HANDLE GAME OVER ---
        if (isGameOver) {
            console.log(`Game ${gameId} has ended.`);

            // Broadcast the final result
            let result = "draw"; // Draw
            if (chess.isCheckmate()) {
                result = turn === 'w' ? "white" : "black"; // White/Black won
            }
            io.to(gameId).emit('gameOver', { result: result });

            // 2. Generate PGN and save to PostgreSQL (this can be async)
            // saveCompletedGame(gameId, newMovesString, result);
        }
    });
}