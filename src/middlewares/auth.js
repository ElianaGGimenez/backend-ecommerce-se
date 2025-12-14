export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ status: "error", message: "No estás autenticada" });
  }
  next();
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ status: "error", message: "Solo administradores" });
  }
  next();
};

export const userOnly = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ status: "error", message: "Solo usuarios" });
  }
  next();
};
