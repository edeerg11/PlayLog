import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

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

// ── Ruta no encontrada ───────────────────────────────
app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.method} ${req.url}`);
  error.statusCode = 404;
  next(error);
});

// ── Manejador de errores ─────────
app.use(errorHandler);

export default app;