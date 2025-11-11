import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectRedis, redisClient } from "./lib/redis-client.js";
import jwt from 'jsonwebtoken';

const PORT = process.env.PORT || 4002;
const NOTIFICATION_QUEUE = process.env.NOTIFICATION_QUEUE || 'notification_queue';

// JWT verification function
const verifyJwt = (token: string): { id: string } => {
  return jwt.verify(token, process.env.JWT_SECRET || "") as { id: string };
};

//Create the server
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins for simplicity. Restrict this in production!
    methods: ["GET", "POST"],
    credentials: true,
  }
});

//Throw errors if redis connection fails
redisClient.on('error', (err) => {
    console.error('Redis Subscriber Error:', err);
})

//Authentication middleware
io.use((socket, next) => {
  try {
    // Check for token from Socket.IO client (your future frontend)
    let token = socket.handshake.auth.token;

    // Check for token from Postman (headers)
    if (!token && socket.handshake.headers.authorization) {
      token = socket.handshake.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new Error('Authentication failed: No token provided'));
    }

    // Verify the token
    const user = verifyJwt(token);
    if (!user) {
      return next(new Error('Authentication failed: Invalid token'));
    }

    // Attach the user data to the socket object for later use
    (socket as any).user = user;
    next();

  } catch (err: any) {
    return next(new Error('Authentication failed: ' + err.message));
  }
});

//Connection Handler (When a client connects)
io.on("connection", (socket) => {
  console.log(`Client connected [id=${socket.id}]`);
  const userId = (socket as any).user.sub;
  console.log(`User ID from token: ${userId}`);

  // Join room
  socket.join(userId);

  socket.on('disconnect', () => {
    console.log(`User ${userId} disconnected`);
  });
});

async function startListening() {
  await redisClient.connect();

  await redisClient.subscribe(NOTIFICATION_QUEUE, (message) => {
    try {
      const eventData = JSON.parse(message);
      console.log('Received message from Redis:', eventData);

      const eventType = eventData.event; // e.g., "ready"
      const userId = eventData.userID;

      if (!eventType || !userId) {
        console.warn('Received malformed message:', eventData);
        return;
      }

      // Create the payload object to send to the client
      const payload = {
        gameID: eventData.gameID,
        color: eventData.color
      };

      // Emit the event to the user's specific room
      io.to(userId).emit(eventType, payload);
      console.log(`Relayed event '${eventType}' to user ${userId}`);

    } catch (err) {
      console.error('Error parsing Redis message:', err);
    }
  });

  console.log(`Redis subscriber connected and listening to "${NOTIFICATION_QUEUE}"`);
}

//Start server
httpServer.listen(PORT, () => {
  console.log(`Notification Service listening on port ${PORT}`);
  startListening();
});
