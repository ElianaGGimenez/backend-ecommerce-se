import ResetPasswordService from "../src/services/ResetPasswordService.js";
const resetSvc = new ResetPasswordService();

export const forgot = async (req, res) => {
  try {
    await resetSvc.createResetTokenForEmail(req.body.email);
    res.json({ status: "success", message: "Email enviado si el usuario existe" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const reset = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await resetSvc.resetPassword(token, newPassword);
    res.json({ status: "success", message: "Contraseña restablecida" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
