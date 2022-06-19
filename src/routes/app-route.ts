import { Router } from "express";
import { AppCtrl } from "../controllers";
import { validateToken } from "../middlewares";

const router = Router();

router.get("/settings", validateToken.validateAuthToken, AppCtrl.getSettings);

export default router;
