import startGameWorker from "./workers/game-start.js";
import {connectRabbitMQ} from "./lib/rabbitmq-connection.js";
import {connectRedis} from "./lib/redis-client.js";
import { createServer} from "http";
import {initSocketServer} from "./socket/index.js";

const PORT = process.env.PORT || 4001;

const httpServer = createServer();

initSocketServer(httpServer);

httpServer.listen(PORT, () => {
    console.log(`PVP Gameplay Service is running on port ${PORT}`);
});

const main = async () => {
    await connectRabbitMQ();
    await connectRedis();
    await startGameWorker();
}

main();