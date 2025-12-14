import express from "express";
import passport from "../config/passport.js";
import * as authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Registro
router.post("/register", authCtrl.register);

// Login
router.post("/login", authCtrl.login);

// Usuario actual (sin datos sensibles, usando DTO)
router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  authCtrl.current
);

export default router;
