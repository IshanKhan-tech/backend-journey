import dns from "dns";
dns.setServers(["8.8.8.8","8.8.4.4"])

import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js"
import connectToDb from "./src/config/database.js"

connectToDb()

app.listen(3000,()=>{
    console.log("server is running on 3000 port");
})