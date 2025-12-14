import nodemailer from "nodemailer";

export const sendResetEmail = async (to, link) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Soporte SE" <${process.env.MAIL_USER}>`,
    to,
    subject: "Restablecer contraseña",
    html: `
      <h2>Restablecer contraseña</h2>
      <p>Hacé click en el siguiente enlace para cambiar tu contraseña:</p>
      <a href="${link}">${link}</a>
    `
  });
};
