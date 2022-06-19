import { Router } from "express";
import { AC } from "../controllers";
import { ValidateBody } from "../middlewares";

const router = Router();

router.post("/login", ValidateBody.validateLoginBody, AC.login);
router.post("/register", ValidateBody.validateRegisterBody, AC.register);
router.post("/logout", AC.logout);

export default router;
