import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";

import User from "../models/user.model.js";
import { generateResetToken, verifyResetToken } from "../utils/jwt.js";
import { sendResetEmail } from "../utils/mailer.js";

const router = Router();

/* =========================
   REGISTER
========================= */
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en el registro" });
  }
});

/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    res.json({ message: "Login exitoso" });
  } catch (error) {
    res.status(500).json({ error: "Error en login" });
  }
});

/* =========================
   CURRENT (SIN DTO)
========================= */
router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    const user = req.user;

    res.json({
      id: user._id,
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name
    });
  }
);

/* =========================
   LOGOUT
========================= */
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout correcto" });
});

/* =========================
   FORGOT PASSWORD
========================= */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const token = generateResetToken(email);
    const link = `${process.env.FRONT_URL}/reset-password/${token}`;

    await sendResetEmail(email, link);

    res.json({ message: "Correo de recuperación enviado" });
  } catch (error) {
    res.status(500).json({ error: "Error enviando email" });
  }
});

/* =========================
   RESET PASSWORD
========================= */
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const { email } = verifyResetToken(token);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const samePass = await bcrypt.compare(password, user.password);
    if (samePass) {
      return res
        .status(400)
        .json({ error: "No podés usar la misma contraseña anterior" });
    }

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Token inválido o expirado" });
  }
});

export default router;
