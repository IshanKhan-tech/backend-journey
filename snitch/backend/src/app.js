import express from "express";
import cors from "cors"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser";


const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: [ "GET", "POST", "PUT", "DELETE" ],
    credentials: true
}))

app.use("/api/auth", authRoute)

export default app;
