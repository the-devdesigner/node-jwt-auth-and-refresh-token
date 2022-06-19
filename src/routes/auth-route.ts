import { Router } from "express";
import { AuthCtrl } from "../controllers";
import { ValidateBody, validateToken } from "../middlewares";

const router = Router();

router.post("/login", ValidateBody.validateLoginBody, AuthCtrl.login);
router.post("/register", ValidateBody.validateRegisterBody, AuthCtrl.register);
router.post("/logout", AuthCtrl.logout);
router.post("/new-token", validateToken.validateRefreshToken, AuthCtrl.generateNewToken);

export default router;
