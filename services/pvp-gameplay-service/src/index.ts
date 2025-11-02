import express from 'express';
import startGameWorker from "./workers/game-start.js";
import {connectRabbitMQ} from "./lib/rabbitmq-connection.js";
import {connectRedis} from "./lib/redis-client.js";

const app = express();
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`PVP Gameplay Service is running on port ${PORT}`);
});

const main = async () => {
    await connectRabbitMQ();
    await connectRedis();
    await startGameWorker();
}

main();