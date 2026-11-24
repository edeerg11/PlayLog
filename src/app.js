import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// ── Middlewares globales ─────────────────────────────
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ── Rutas ────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/api/auth", authRoutes);


export default app;
