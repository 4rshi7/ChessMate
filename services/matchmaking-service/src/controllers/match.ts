import { Request, Response } from 'express';
import amqp from 'amqplib';
import {amqp_channel} from "../lib/rabbitmq-connection";
import axios from "axios";
import {redisClient} from "../lib/redis-client";

const MATCHMAKING_QUEUE = process.env.MATCHMAKING_QUEUE || 'matchmaking_queue';
const WAITING_PLAYERS = 'waiting_players';

export const enterMatchmakingQueue = async (req: Request, res: Response) => {
    try{
        if(!amqp_channel){
            throw new Error('RabbitMQ channel is not initialized');
        }
        const playerID = req.get('x-userid');
        console.log("Player ID from header:", playerID);

        if(!playerID){
            return res.status(404).send({ message: 'Please login to start game' });
        }

        const isPlayerAlreadyInGame = await redisClient.sIsMember("ingame:users", playerID);

        if(isPlayerAlreadyInGame){
            return res.status(400).send({ message: 'Player is already in a game' });
        }

        const player = await axios.get(`http://user-service:5002/api/users/id/${playerID}`);
        const playerRating: number = player.data.ratings.blitz;
        const playerUsername: string = player.data.username;
        console.log("Player Rating:", playerRating);

        const playerData = JSON.stringify({ playerID, playerRating, playerUsername });

        await amqp_channel.assertQueue(MATCHMAKING_QUEUE, { durable: true });
        const message = Buffer.from(playerData);
        amqp_channel.sendToQueue(MATCHMAKING_QUEUE, message, { persistent: true });


        res.send("Player added to matchmaking queue : " + playerData);
    }catch (error) {
        console.error('Error in RabbitMQ producer:', error);

        res.status(500).send({ message: 'Failed to add player to matchmaking queue' });
    }
}