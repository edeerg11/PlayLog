import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// ── Middlewares globales ─────────────────────────────
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ── Rutas ────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
