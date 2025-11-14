import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import { initPassport } from "./config/passport.config.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

connectDB();

initPassport();
app.use(passport.initialize());

app.use("/api/sessions", sessionsRouter); 
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
  res.json({ message: "🚀 Servidor funcionando correctamente" });
});

export default app;
