import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import passport from "passport";
import dotenv from "dotenv";

import { initPassport } from "./src/config/passport.js";

import sessionsRouter from "./src/routes/sessions.router.js";
import productsRouter from "./src/routes/products.router.js";

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARES
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =========================
   PASSPORT
========================= */
app.use(passport.initialize());
initPassport();

/* =========================
   ROUTES
========================= */
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productsRouter);

/* =========================
   DB
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("❌ Error Mongo:", err));

export default app;
