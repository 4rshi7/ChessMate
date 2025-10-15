import express from 'express';
import matchRouter from './routes/match';
import { matchPlayers} from "./workers/matchmaker";
import {connectRedis, redisClient} from "./lib/redis-client";
import {closeRabbitMQConnection, connectRabbitMQ} from "./lib/rabbitmq-connection";

const app = express();
const PORT = process.env.PORT || 4000;


if(!PORT) {
    throw new Error('PORT is not defined');
}

app.use('/matchmaking', matchRouter);

app.get('/', (req, res) => {
    res.send('Matchmaking Service is running');
});

app.listen(PORT, async () => {
    console.log(`Matchmaking Service is running on port ${PORT}`);
    await connectRedis();
    await connectRabbitMQ();
    await matchPlayers();
});

const gracefulShutdown = async () => {
    console.log('\nShutting down gracefully...');
    await closeRabbitMQConnection();
    await redisClient.quit();
    process.exit(0);
};

// Listen for shutdown signals
process.on('SIGINT', gracefulShutdown); // Catches Ctrl+C
process.on('SIGTERM', gracefulShutdown); // Catches kill commands


