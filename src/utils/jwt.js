import jwt from "jsonwebtoken";

export const generateResetToken = (email) => {
  return jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const verifyResetToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
