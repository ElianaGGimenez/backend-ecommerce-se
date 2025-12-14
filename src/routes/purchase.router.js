import express from "express";
import passport from "../config/passport.js";
import * as ctrl from "../controllers/purchase.controller.js";
import { authorizeRoles } from "../middlewares/authorization.js";

const router = express.Router();

// checkout: solo user
router.post("/checkout/:cartId", passport.authenticate("current", { session:false }), authorizeRoles("user"), ctrl.checkout);

export default router;
