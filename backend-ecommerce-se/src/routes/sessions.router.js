import { Router } from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "El usuario ya existe" });

    const hashed = bcrypt.hashSync(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      age,
      password: hashed,
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
});

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  async (req, res) => {
    const user = req.user;
    const token = generateToken(user);
    res.json({
      status: "success",
      message: "Login exitoso",
      token,
    });
  }
);

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    res.json({
      message: "Usuario autenticado correctamente",
      user: req.user,
    });
  }
);

router.get("/", async (req, res) => {
  const users = await User.find().select("-password").lean();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user);
});

router.put("/:id", async (req, res) => {
  const updates = req.body;
  if (updates.password) {
    updates.password = bcrypt.hashSync(updates.password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json({ message: "Usuario actualizado", updatedUser });
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Usuario eliminado" });
});

router.get("/test", (req, res) => {
  res.json({ message: "Servidor y rutas funcionando ✅" });
});

export default router;
