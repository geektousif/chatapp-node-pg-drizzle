import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import app from "./app";

import { PORT } from "./config/env.config";
import { initializeSocket } from "./socket";
import { socketAuth } from "./middlewares/auth.middleware";

const server = http.createServer(app);
const io = new Server(server, {
  /* cors */
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.use(socketAuth);

initializeSocket(io);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
