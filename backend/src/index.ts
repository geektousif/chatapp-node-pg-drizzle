import http from "http";
import { Server } from "socket.io";
import app from "./app";

import { PORT } from "./config/env.config";

const server = http.createServer(app);
const io = new Server(server, {
  /* cors */
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
