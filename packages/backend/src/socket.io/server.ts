import { createServer } from "http";
import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./index";

const httpServer = createServer();
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  // options
});

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(2997, () => {
  console.log("Socket.io server is running on port 2997");
});
