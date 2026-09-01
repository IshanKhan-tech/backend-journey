import authRoutes from "./routes/auth.route.js";
import express from "express";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;
