import crypto from "crypto";
import bcrypt from "bcrypt";
import PasswordResetToken from "../models/PasswordResetToken.js";
import User from "../models/User.js";
import { sendResetPasswordEmail } from "../backend-ecommerce-se/src/utils/mailer.js";

export default class ResetPasswordService {
  constructor() {}

  async createResetTokenForEmail(email) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("No existe usuario con ese email");
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + Number(process.env.PASSWORD_RESET_TOKEN_EXPIRATION_MINUTES || 60));

    await PasswordResetToken.create({
      userId: user._id,
      tokenHash,
      expiresAt: expires
    });

    await sendResetPasswordEmail({ to: user.email, token });
    return true;
  }

  async resetPassword(token, newPassword) {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const record = await PasswordResetToken.findOne({ tokenHash });
    if (!record) throw new Error("Token inválido");
    if (record.used) throw new Error("Token ya usado");
    if (new Date() > record.expiresAt) throw new Error("Token expirado");

    const user = await User.findById(record.userId);
    if (!user) throw new Error("Usuario no encontrado");

    // evitar restablecer a la misma contraseña
    const same = await bcrypt.compare(newPassword, user.password);
    if (same) throw new Error("La nueva contraseña no puede ser igual a la anterior");

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    record.used = true;
    await record.save();
    return true;
  }
}
