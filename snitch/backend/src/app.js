import express from "express";
import authRoute from "./routes/auth.route"

const app = express();

app.use("/api/auth", authRoute)

export default app;
