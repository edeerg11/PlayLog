import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { verifyToken, requireRole } from "../middlewares/auth.middleware.js";

const router = Router();

// Solo administradores
router.get("/", verifyToken, requireRole("admin"), userController.getAll);

export default router;
