import express from "express";
import * as ctrl from "../controllers/product.controller.js";
import passport from "../config/passport.js";
import { authorizeRoles } from "../middlewares/authorization.js";

const router = express.Router();

router.get("/", ctrl.listProducts);
router.get("/:id", ctrl.getProduct);

router.post(
  "/",
  passport.authenticate("current", { session: false }),
  authorizeRoles("admin"),
  ctrl.createProduct
);
router.put(
  "/:id",
  passport.authenticate("current", { session: false }),
  authorizeRoles("admin"),
  ctrl.updateProduct
);
router.delete(
  "/:id",
  passport.authenticate("current", { session: false }),
  authorizeRoles("admin"),
  ctrl.deleteProduct
);

export default router;
