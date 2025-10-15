import { Request, Response } from 'express';
import amqp from 'amqplib';
import {amqp_channel} from "../lib/rabbitmq-connection";

const MATCHMAKING_QUEUE = process.env.MATCHMAKING_QUEUE || 'matchmaking_queue';

export const enterMatchmakingQueue = async (req: Request, res: Response) => {
    try{
    if(!amqp_channel){
        throw new Error('RabbitMQ channel is not initialized');
    }
        //TODO: Replace this with actual player data from authentication middleware
        const playerID = req.get('Player-Data') || '12345';

        //TODO: Get actual player rating from user profile service
        const playerRating = Math.floor(Math.random() * 1000);

        const playerData = JSON.stringify({ playerID, playerRating });

        await amqp_channel.assertQueue(MATCHMAKING_QUEUE, { durable: true });
        const message = Buffer.from(playerData);
        amqp_channel.sendToQueue(MATCHMAKING_QUEUE, message, { persistent: true });

        res.send("Player added to matchmaking queue : " + playerData);
    }catch (error) {
        console.error('Error in RabbitMQ producer:', error);

        res.status(500).send({ message: 'Failed to add player to matchmaking queue' });
    }
}