import jwt from "jsonwebtoken";


async function verifyToken(req,res,next){
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
    }
const token = authHeader.split(" ")[1];
    try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
    } catch (error) {
    return res.status(401).json({ error: "Token invalido o expirado" });
    }

}

const requireRole = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ error: "No autenticado" });
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ error: "No tienes permiso para esta acción" });
    }

    next();
  };
};

export { verifyToken, requireRole };