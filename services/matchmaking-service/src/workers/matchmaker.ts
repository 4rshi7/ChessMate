import { redisClient } from "../lib/redis-client";
import amqp from "amqplib";
import {amqp_channel} from "../lib/rabbitmq-connection";


const MATCHMAKING_QUEUE = process.env.MATCHMAKING_QUEUE || 'matchmaking_queue';
const GAME_START_QUEUE = process.env.GAME_START_QUEUE || 'game_start_queue';
const WAITING_PLAYERS = 'waiting_players';

export const matchPlayers = async () => {
    try {
        if(!amqp_channel){
            throw Error("RabbitMQ Channel not established");
        }
        await amqp_channel.assertQueue(MATCHMAKING_QUEUE, {durable: true});
        await amqp_channel.assertQueue(GAME_START_QUEUE, { durable: true });

        amqp_channel.consume(MATCHMAKING_QUEUE, async (msg: amqp.ConsumeMessage | null) => {
            if (!msg || !amqp_channel) return;

            const player1Data = JSON.parse(msg.content.toString());
            console.log(player1Data);
            const player1Rating = player1Data.playerRating;

            //Check if any player is waiting which can be matched with current player
            const player2Data = await redisClient.zRangeByScore(WAITING_PLAYERS, player1Rating - 200, player1Rating + 200);
            if (player2Data.length != 0) {
                console.log("Player Matched with: " + player2Data[0]);
                const startGameData = {
                    "players" : [
                        player1Data,
                        JSON.parse(player2Data[0])
                    ],
                    "timeControl": {
                        "initial": 300,
                        "increment": 3
                    }
                }
                const startGameMsg = Buffer.from(JSON.stringify(startGameData));
                amqp_channel.sendToQueue(GAME_START_QUEUE, startGameMsg, {
                    persistent: true
                })
                await redisClient.zRem(WAITING_PLAYERS, player2Data[0]);
            } else {
                console.log("Player not found. Adding it to cache...");
                await redisClient.zAdd(WAITING_PLAYERS, {
                    score: player1Rating,
                    value: JSON.stringify(player1Data)
                })
            }
        }, {
            noAck: true
        });

    } catch (error) {
        console.error(error);
    }
}