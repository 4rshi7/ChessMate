// services/socket.ts
import { io, Socket } from "socket.io-client";
import { useGameStore } from "../store/gameStore";
import { useAuthStore } from "../store/authStore";

let socket: Socket | null = null;

export const connectToGameSocket = (url: string) => {
  if (socket) return socket; 

  const token = useAuthStore.getState().token;

  socket = io(url, {
    auth: { token },  
    transports: ["websocket"], 
  });

  socket.on("connect", () => {
    console.log("✅ Connected to game socket:", socket?.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected from game socket");
    socket = null;
  });

 
  socket.on("gameState", (data) => {
    useGameStore.getState().initGame(data.gameId, data.fen, data.clocks);
  });

  socket.on("move", (data) => {
    useGameStore.getState().addMove(data.san, data.fen);
  });

  socket.on("gameOver", () => {
    useGameStore.setState({ status: "finished" });
  });

  return socket;
};

export const sendSocket = (event: string, payload?: any) => {
  if (!socket || !socket.connected) throw new Error("Socket not connected");
  socket.emit(event, payload);
};
