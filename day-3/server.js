require("dotenv").config()
const dns = require("dns")
dns.setServers(["8.8.8.8","8.8.4.4"])

const connectToDB = require("./src/config/database")
const mongoose = require("mongoose")
const app = require("./src/app")



connectToDB()

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})