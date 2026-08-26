const express = require("express")
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/auth.route")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// Routes
app.use("/api/auth", authRoute)

module.exports = app