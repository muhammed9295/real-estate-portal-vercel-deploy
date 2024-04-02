import { Router } from "express";
import {
  getCurrentAgent,
  loginAgent,
  logoutAgent,
  registerAgent,
  updateCurrentAgent,
} from "../controllers/agent.controllers.js";
import { verifyAgentJWT } from "../middlewares/agent.auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/register-agent").post(registerAgent);
router.route("/login-agent").post(loginAgent);

// Secured Routes
router.route("/logout-agent").post(verifyAgentJWT, logoutAgent);
router.route("/get-agent").get(verifyAgentJWT, getCurrentAgent);
router
  .route("/update-agent")
  .patch(verifyAgentJWT, upload.single("avatar"), updateCurrentAgent);

export default router;
