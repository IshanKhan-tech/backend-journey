import express from "express";
import runGraph from "./services/graph.service.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/invoke", async (req, res) => {
  try {
    const { problem } = req.body;

    console.log("Received problem:", problem);

    if (!problem || typeof problem !== "string") {
      return res.status(400).json({
        message: "Problem is required",
      });
    }

    const result = await runGraph(problem);

    res.status(200).json({
      message: "Graph executed successfully",
      success: true,
      result,
    });
  } catch (error) {
    console.error("GRAPH ERROR:", error);

    res.status(500).json({
      message: error instanceof Error ? error.message : "Graph execution failed",
      success: false,
    });
  }
});

export default app;
