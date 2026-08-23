const express = require("express")
const authRoute = require("./routes/auth.route")

const app = express()
app.use(express.json())

// routes

app.use("/api/auth", authRoute)

module.exports = app