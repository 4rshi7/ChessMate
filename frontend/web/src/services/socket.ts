// services/socket.ts
import { io, Socket } from "socket.io-client";
import { useGameStore } from "../store/gameStore";
import { useAuthStore } from "../store/authStore";

let gameSocket: Socket | null = null;

let notifSocket : Socket | null = null;


export const connectToNotifSocket = (url: string) => {
  if(notifSocket) return notifSocket;

    const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJkZWZhdWx0IiwiaWQiOiIxMjM0NSIsInVzZXIiOiJKb2huIERvZSIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjIsIm5iZiI6MTc2Mjc3NzY1NCwiZXhwIjoxNzY0NTExMDQ3fQ.uKndUtQCA_hCiHpLKDi6afYP4Vpc6uNVEJrx7LUKZWg";


     notifSocket = io(url, {
    auth: { token },
    transports: ["websocket"],
  });

  console.log(notifSocket);

  notifSocket.on("connect", ()=>{
    console.log("connected to notification service ");
  });

  notifSocket.on("disconnect",(reason)=>{
    console.log("disconnected" , reason);
     gameSocket = null;
  })
 // ready , active , completed
  notifSocket.on("ready",(payload)=>{
    const gameId = payload.gameId;
    const color = payload.color;

   connectToGameSocket("http://localhost:4001"); 

    // 3. Tell the store to join the room. This will call sendGameSocket("joinRoom", ...)
    //    We also pass the color so the store can set it temporarily.
    //    We pass 'undefined' for fen/clocks so they use the defaults *for now*.
    useGameStore.getState().initGame(gameId, undefined, color, undefined);
    useGameStore.getState().joinRoom(gameId);
  })
}

export const sendNotifSocket =  (event: string, payload?: any) => {
  if (!notifSocket || !notifSocket.connected) throw new Error("Socket not connected");
  notifSocket.emit(event, payload);
};

export const connectToGameSocket = (url: string) => {
  if (gameSocket) return gameSocket;

  // const token = useAuthStore.getState().token; uncomment this later

  const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJkZWZhdWx0IiwiaWQiOiIxMjM0NSIsInVzZXIiOiJKb2huIERvZSIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjIsIm5iZiI6MTc2Mjc3NzY1NCwiZXhwIjoxNzY0NTExMDQ3fQ.uKndUtQCA_hCiHpLKDi6afYP4Vpc6uNVEJrx7LUKZWg";



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
    useGameStore.getState().updateFromServer({
      fen: data.fen,
      lastMove: data.lastMove,
      clocks: data.clocks,
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
  if (!gameSocket || !gameSocket.connected) throw new Error("Socket not connected");
  gameSocket.emit(event, payload);
};






