export const requireAuth = (req, res, next) => {
  if (!req.user) return res.status(401).json({ status:"error", message:"No autenticado" });
  next();
};

export const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ status:"error", message:"No autenticado" });
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ status:"error", message:"Acceso denegado" });
  }
  next();
};
