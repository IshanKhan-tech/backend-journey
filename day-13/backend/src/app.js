const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const followRouter = require("./routes/follow.route");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api", followRouter);

module.exports = app;
