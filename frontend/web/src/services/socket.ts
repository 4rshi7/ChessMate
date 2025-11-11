// services/socket.ts
import { io, Socket } from "socket.io-client";
import { useGameStore } from "../store/gameStore";
import { useAuthStore } from "../store/authStore";

let gameSocket: Socket | null = null;

let notifSocket: Socket | null = null;


export const connectToNotifSocket = (url: string) => {
  if (notifSocket) return notifSocket;

  const token = useAuthStore.getState().token;

  notifSocket = io(url, {
    auth: { token },
    transports: ["websocket"],
  });


  notifSocket.on("connect", () => {
    console.log("connected to notification service ");
  });

  notifSocket.on("disconnect", (reason) => {
    console.log("disconnected", reason);
    // notifSocket = null;
  })
  // ready , active , completed
  notifSocket.on("ready", (payload) => {
    console.log(" READY EVENT RECEIVED");
    console.log(payload);
    const gameId = payload.gameID;
    const color = payload.color;
    // 3. Tell the store to join the room. 
    console.log("game id ", gameId);
    console.log("color", color);
    useGameStore.getState().initGame(gameId, undefined, color, undefined);
  })
}

export const disconnectNotifSocket = () => {
  if (notifSocket) {
    console.log("Disconnecting from notification service...");
    notifSocket.disconnect();
    notifSocket = null;
  }
};

export const sendNotifSocket = (event: string, payload?: any) => {
  if (!notifSocket) throw new Error("Socket not connected");
  notifSocket.emit(event, payload);
};

export const connectToGameSocket = (url: string) => {
  if (gameSocket) return gameSocket;

  const token = useAuthStore.getState().token;

  gameSocket = io(url, {
    auth: { token },
    transports: ["websocket"],
  });

  console.log(gameSocket);

  gameSocket.on("connect", () => {
    console.log("✅ Connected to game gameSocket:", gameSocket?.id);
  });

  gameSocket.on("disconnect", (reason) => {
    console.log("❌ Disconnected:", reason);
    gameSocket = null;
  });

  gameSocket.io.on("reconnect", (attempt) => {
    console.log(`🔄 Reconnected after ${attempt} attempts`);
  });



  gameSocket.on("gameStateUpdate", (data) => {
    console.log("game Update data", data);
    useGameStore.getState().updateFromServer({
      fen: data.fen,
      lastMove: data.lastMove,
      clocks: {
        white: data.clocks.whiteClock,
        black: data.clocks.blackClock,
      }
    });
  });

  gameSocket.on("gameOver", () => {
    useGameStore.setState({ status: "finished" });
  });

  gameSocket.on("gameError", (err) => {
    console.error("game Error", err.message);
  })

  return gameSocket;
};

export const sendGameSocket = (event: string, payload?: any) => {
  if (!gameSocket) throw new Error("Socket not connected");
  gameSocket.emit(event, payload);
};

export const disconnectGameSocket = () => {
  if (gameSocket) {
    console.log("❌ Disconnecting from game socket...");
    gameSocket.disconnect();
    gameSocket = null;
  }
};






