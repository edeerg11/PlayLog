import { Router } from "express";
import gameController from "../controllers/game.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Publicas
router.get("/", gameController.getAll);
router.get("/:id", gameController.getById);

// Requieren estar autenticado
router.post("/", verifyToken, gameController.create);
router.patch("/:id", verifyToken, gameController.update);
router.delete("/:id", verifyToken, gameController.remove);

export default router;