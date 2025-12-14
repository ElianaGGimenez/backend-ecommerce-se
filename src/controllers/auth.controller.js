import User from "../models/user.model.js";
import UserRepository from "../repository/UserRepository.js";
import CartRepository from "../repository/CartRepository.js";
import AuthService from "../services/AuthService.js";
import UserDTO from "../dto/UserDTO.js";

const userRepo = new UserRepository(User);
const cartRepo = new CartRepository((await import("../../models/Cart.js")).default);
const authService = new AuthService(userRepo, cartRepo);

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ status: "success", user: new UserDTO(user) });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.json({ status: "success", user: new UserDTO(user), token });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const current = async (req, res) => {
  // req.user proviene de passport 'current'
  res.json({ status: "success", user: new UserDTO(req.user) });
};
