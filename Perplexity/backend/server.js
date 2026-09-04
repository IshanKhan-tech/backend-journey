import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";

dotenv.config();

import app from "./src/app.js";
import http from "http";
import connectToDb from "./src/config/database.js";
import { initSocket } from "./src/socket/server.socket.js";

const httpServer = http.createServer(app);

initSocket(httpServer); 

const PORT = process.env.PORT || 3000;
connectToDb();

httpServer.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});