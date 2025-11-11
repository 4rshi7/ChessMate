import amqp from "amqplib";
import {amqp_channel} from "../lib/rabbitmq-connection.js";
import {type GameState} from "../types.js";
import {Chess} from "chess.js";
import {redisClient} from "../lib/redis-client.js";
import {v4 as uuidv4 } from 'uuid';

const GAME_START_QUEUE = process.env.GAME_START_QUEUE || 'game_start_queue';
const NOTIFICATION_QUEUE = process.env.NOTIFICATION_QUEUE || 'notification_queue';

const startGameWorker = async () => {
    try {
        if(!amqp_channel){
            throw Error("RabbitMQ Channel not established");
        }
        await amqp_channel.assertQueue(GAME_START_QUEUE, { durable: true });

        amqp_channel.consume(GAME_START_QUEUE, async (msg: amqp.ConsumeMessage | null) => {
            if (!msg) return;

            const gameData = JSON.parse(msg.content.toString());
            console.log("Starting game with data: ", gameData);

            const chessGame = new Chess();

            const gameState = await initializeGameState(gameData, chessGame);

            await publishGameStart(gameState);

            // Here you would add the logic to actually start the game,
            // e.g., initializing game state, notifying players, etc.

        }, {
            noAck: true
        });

    } catch (error) {
        console.error(error);
    }
}

const initializeGameState = async (gameData: any, chessGame: Chess) => {
    const player1 = gameData.players[0].playerID;
    const player1Rating = gameData.players[0].playerRating;
    const player1Username = gameData.players[0].playerUsername;

    const player2 = gameData.players[1].playerID;
    const player2Rating = gameData.players[1].playerRating;
    const player2Username = gameData.players[1].playerUsername;

    const initialTiming = gameData.timeControl.initial;
    const timeIncrement = gameData.timeControl.increment;

    console.log("Player 1:", player1 , " ", player1Rating);
    console.log("Player 2:", player2 , " ", player2Rating);

    const initialFEN = chessGame.fen();
    const gameID = uuidv4();

    const gameState: GameState = {
        gameID: gameID,
        fen: initialFEN,
        whitePlayer: player1,
        blackPlayer: player2,
        blackClock: 300000, // 5 minutes in milliseconds
        whiteClock: 300000,
        whiteRating: player1Rating,
        blackRating: player2Rating,
        whiteUsername: player1Username,
        blackUsername: player2Username,
        increment: timeIncrement,
        status: "ready",
        moves: JSON.stringify([]),
        lastMoveTimestamp: Date.now()
    }

    //redis safe object
    const redisGameObject: { [key: string]: string | number } = {
        gameID: gameState.gameID,
        fen: gameState.fen,
        whitePlayer: gameState.whitePlayer,
        blackPlayer: gameState.blackPlayer,
        blackClock: gameState.blackClock,
        whiteClock: gameState.whiteClock,
        whiteRating: gameState.whiteRating,
        blackRating: gameState.blackRating,
        whiteUsername: gameState.whiteUsername,
        blackUsername: gameState.blackUsername,
        increment: gameState.increment, // Ensure timeIncrement is a number
        status: gameState.status,       // This will work if status is a string
        moves: gameState.moves,
        lastMoveTimestamp: gameState.lastMoveTimestamp || Date.now()
    };

    console.log(gameState);

    await redisClient.hSet(`game:match:${gameID}`, redisGameObject);
    await redisClient.sAdd("ingame:users", gameState.whitePlayer);
    await redisClient.sAdd("ingame:users", gameState.blackPlayer);

    return gameState;
}

const publishGameStart = async (gameState: GameState) => {
    const player1Notification = {
        gameID: gameState.gameID,
        userID: gameState.blackPlayer,
        opponentUsername: gameState.whiteUsername,
        opponentRating: gameState.whiteRating,
        color: "black",
        event: "ready"
    };

    const player2Notification = {
        gameID: gameState.gameID,
        userID: gameState.whitePlayer,
        opponentUsername: gameState.blackUsername,
        opponentRating: gameState.blackRating,
        color: "white",
        event: "ready"
    };

    await redisClient.publish(NOTIFICATION_QUEUE, JSON.stringify(player1Notification));
    await redisClient.publish(NOTIFICATION_QUEUE, JSON.stringify(player2Notification));
}

export default startGameWorker;