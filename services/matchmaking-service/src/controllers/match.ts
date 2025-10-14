import { Request, Response } from 'express';
import amqp from 'amqplib';

const MATCHMAKING_QUEUE = 'matchmaking_queue';

export const enterMatchmakingQueue = async (req: Request, res: Response) => {
    let connection: any;
    try{
        connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');

        //TODO: Replace this with actual player data from authentication middleware
        const playerID = req.get('Player-Data') || '12345';

        //TODO: Get actual player rating from user profile service
        const playerRating = Math.floor(Math.random() * 1000);

        const playerData = JSON.stringify({ playerID, playerRating });
        const channel = await connection.createChannel();

        await channel.assertQueue(MATCHMAKING_QUEUE, { durable: true });
        const message = Buffer.from(playerData);
        channel.sendToQueue(MATCHMAKING_QUEUE, message, { persistent: true });

        res.send("Player added to matchmaking queue : " + playerData);
        setTimeout(function() {
            channel.close();
            connection.close();
        }, 500);
    }catch (error) {
        console.error('Error in RabbitMQ producer:', error);

        res.status(500).send({ message: 'Failed to add player to matchmaking queue' });
    }
}