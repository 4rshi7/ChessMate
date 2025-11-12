import { type Server, type Socket } from 'socket.io';
import { redisClient} from "../lib/redis-client.js";
import {Chess} from "chess.js";
import type {ResultType, TerminationType} from "../types.js";
import EloRank from 'elo-rank';
import prisma from "../db/db.js";
import { Result, TeminationType } from '@prisma/client';
import axios = require("axios");

export const onConnection = async (io: Server, socket: Socket) => {
    const userId = (socket as any).user.sub;
    console.log("socket user:" , (socket as any).user);
    console.log(`User ${userId} connected with socket ${socket.id}`);

    socket.on('joinRoom', async (joinData: {authToken: string, gameId: string}) => {
        const { gameId } = joinData;
        console.log(`User ${userId} joining room for game ${gameId}`);
        const game = await redisClient.hGetAll(`game:match:${gameId}`);

        if(!game || (userId !== game.blackPlayer && userId !== game.whitePlayer)) {
            console.log(`User ${userId} is not a participant in game ${gameId}. Disconnecting.`);
            socket.disconnect();
            return;
        }

        socket.data.gameId = gameId;
        socket.join(gameId);

        socket.data.color = (userId === game.whitePlayer) ? 'white' : 'black';
        console.log(`User ${userId} joined room for game ${gameId}`);
    });

    socket.on('makeMove', async (moveData: { from: string, to: string}) => {
        const {  from, to } = moveData;
        const gameId = socket.data.gameId;
        const userId = (socket as any).user.sub;

        console.log(`User ${userId} making move in game ${gameId} from ${from} to ${to}`);


        if(!gameId){
            console.log("You haven't joined a game.")
        }

        const game = await redisClient.hGetAll(`game:match:${gameId}`);

        const chess = new Chess(game.fen);

        const turn = chess.turn();
        if ((turn === 'w' && userId !== game.whitePlayer) ||
            (turn === 'b' && userId !== game.blackPlayer)) {
            return socket.emit('gameError', {
                message: "It's not your turn."
            });
        }

        let moveResult;
        try{
            moveResult = chess.move({from, to});
        }catch (err){
            console.log("Invalid Move");
            return socket.emit('gameError', {
                message: "Invalid move."
            });
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
            io.to(gameId).emit('gameOver', { result: winner, termination_type: "TIMEOUT" });

            // Save the game, but with the timeout result
            await saveCompletedGame(gameId, game.blackPlayer, game.whitePlayer, game.moves, winner, "TIMEOUT");
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
            lastMoveTimestamp: Date.now(),
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
            let result: ResultType = "draw"; // Draw
            if (chess.isCheckmate()) {
                result = turn === 'w' ? "white" : "black"; // White/Black won
            }

            //TODO: Calculate termination type properly
            const termination_type: TerminationType = chess.isCheckmate() ? "CHECKMATE" :
                chess.isStalemate() ? "STALEMATE" :
                    "AGREED_DRAW";
            io.to(gameId).emit('gameOver', { result: result, termination_type });

            //Generate PGN and save to PostgreSQL
            await saveCompletedGame(gameId, game.blackPlayer, game.whitePlayer, newMovesString, result, termination_type);
        }
    });

    socket.on('resign', async () => {
        const  color  = socket.data.color;
        const gameId = socket.data.gameId;
        const game = await redisClient.hGetAll(`game:match:${gameId}`);

        const result: ResultType = color === 'white' ? 'black' : 'white';

        io.to(gameId).emit('gameOver', { result: result, termination_type: "RESIGNATION" });
        // await updateRatings(gameId, game.blackPlayer, game.whitePlayer, result);
        await saveCompletedGame(gameId, game.blackPlayer, game.whitePlayer, game.moves, result, "RESIGNATION");

    })
}

const saveCompletedGame = async (gameId: string, blackPlayerId: string | undefined, whitePlayerId: string | undefined, moves: string | undefined, result: ResultType, termination_type: TerminationType) => {
    if(!blackPlayerId || !whitePlayerId){
        console.log("Cannot save game without both player IDs.");
        return;
    }
    if(!moves){
        console.log("Cannot save game without moves.");
        return;
    }


    const pgn = generatePGN(moves);
    await updateRatings(gameId, blackPlayerId, whitePlayerId, result);

    // Save to PostgreSQL
    console.log(`Saving completed game ${gameId} to database.`);
    console.log({
        gameId,
        blackPlayerId,
        whitePlayerId,
        moves,
        pgn,
        result,
        termination_type
    })

    const gameData = {
        game_id: gameId,
        black_player_id: blackPlayerId,
        white_player_id: whitePlayerId,
        pgn: pgn,
        result:
            result === "draw"
                ? Result.DRAW
                : result === "black"
                    ? Result.BLACK_WIN
                    : Result.WHITE_WIN,
        termination_type: termination_type as TeminationType,
        finished_at: new Date(),
    };

    try {
        const newGame = await prisma.game.create({
            data: gameData
        });
        console.log(`Game ${gameId} saved successfully with ID ${newGame.game_id}.`);
    }catch (err) {
        console.error("Error saving game to database:", err);
    }

    try{
        await redisClient.del(`game:match:${gameId}`);
        await redisClient.sRem("ingame:users", blackPlayerId);
        await redisClient.sRem("ingame:users", whitePlayerId);
        console.log(`Deleted game ${gameId} from Redis.`);
    }catch (err){
        console.error("Error deleting game from Redis:", err);
    }
}

const updateRatings = async (gameId: string, blackPlayerId: string | undefined, whitePlayerId: string | undefined, result: ResultType) => {
    if(!blackPlayerId || !whitePlayerId){
        console.log("Cannot update ratings without both player IDs.");
        return;
    }
    const elo = new EloRank();

    // 2. Fetch current ratings for BOTH players
    // NOTE: Corrected Redis keys to fetch by *playerId*, not gameId.
    // I've assumed your stats are in a hash 'user:stats:[playerId]' with a field 'rating'.
    const [blackRatingStr, blackUsername] = await redisClient.hmGet(
        `game:match:${gameId}`,
        ['blackRating', 'blackUsername']
    );

    const [whiteRatingStr, whiteUsername] = await redisClient.hmGet(
        `game:match:${gameId}`,
        ['whiteRating', 'whiteUsername']
    );

    // 3. Parse ratings, providing a default (e.g., 1200) if user has no rating
    const blackRating = parseInt(blackRatingStr || '1200');
    const whiteRating = parseInt(whiteRatingStr || '1200');

    // 4. Get expected scores for both players
    const expectedScoreBlack = elo.getExpected(blackRating, whiteRating);
    const expectedScoreWhite = elo.getExpected(whiteRating, blackRating);

    // 5. Determine the "actual" score (1 for win, 0.5 for draw, 0 for loss) for EACH player
    // This is the correct way to handle all three outcomes.
    let actualScoreBlack: number;
    let actualScoreWhite: number;

    if (result === 'white') {
        actualScoreBlack = 0;  // Black lost
        actualScoreWhite = 1;  // White won
    } else if (result === 'black') {
        actualScoreBlack = 1;  // Black won
        actualScoreWhite = 0;  // White lost
    } else { // Assuming 'draw'
        actualScoreBlack = 0.5; // Draw
        actualScoreWhite = 0.5; // Draw
    }

    // 6. Calculate new (updated) ratings
    const updatedBlackRating = Math.round(elo.updateRating(expectedScoreBlack, actualScoreBlack, blackRating));
    const updatedWhiteRating = Math.round(elo.updateRating(expectedScoreWhite, actualScoreWhite, whiteRating));

    const ratingUpdateData = {
        gameServiceId: gameId,
        timeControl: 'RAPID',
        whitePlayer: {
            authUserId: whitePlayerId,
            ratingBefore: whiteRating,
            username: whiteUsername,
            ratingAfter: updatedWhiteRating,
            result: result === 'white' ? 'WIN' : result === 'black' ? 'LOSS' : 'DRAW'
        },
        blackPlayer: {
            authUserId: blackPlayerId,
            ratingBefore: blackRating,
            username: blackUsername,
            ratingAfter: updatedBlackRating,
            result: result === 'black' ? 'WIN' : result === 'white' ? 'LOSS' : 'DRAW'
        }
    };
    console.log("Rating update data: ", ratingUpdateData);

    const response = await axios.post("http://user-service:5002/api/internal/game-result", ratingUpdateData).catch(err => {
        console.error("Error updating user ratings:", err);
    });

}

const generatePGN = (moves: string): string => {
    const game = new Chess();
    const movesList: string[] = JSON.parse(moves);

    movesList.forEach(move => {
        game.move(move);
    });

    return game.pgn();
}