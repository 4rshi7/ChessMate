import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import jwt from 'jsonwebtoken';
import { onConnection } from './gameplayHandler.js';

// JWT verification function
const verifyJwt = (token: string): { id: string } => {
    return jwt.verify(token, 'MY_SECRET_KEY') as { id: string };
};

export function initSocketServer(httpServer: HttpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
        }
    });

    // --- Authentication Middleware ---
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

    // --- Main Connection Handler ---
    // After auth succeeds, this function handles the 'connection' event.
    io.on('connection', (socket) => {
        onConnection(io, socket);
    });

    console.log("Socket.IO server initialized");
    return io;
}