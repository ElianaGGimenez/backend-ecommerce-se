import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export default class AuthService {
  constructor(userRepository, cartRepository) {
    this.userRepository = userRepository;
    this.cartRepository = cartRepository;
  }

  async register(userData) {
    const exists = await this.userRepository.findByEmail(userData.email);
    if (exists) throw new Error("Email ya registrado");
    const hashed = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepository.create({ ...userData, password: hashed });
    // create cart
    const cart = await this.cartRepository.create({ owner: user._id, products: [] });
    user.cart = cart._id;
    await user.save();
    return user;
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Credenciales inválidas");
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error("Credenciales inválidas");
    const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    return { user, token };
  }
}
