import express from "express";
import * as ctrl from "../controllers/resetPassword.controller.js";

const router = express.Router();

router.post("/forgot", ctrl.forgot);
router.post("/reset", ctrl.reset);

export default router;
