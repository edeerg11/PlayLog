/**
 * Manejador de errores global.
 * Traduce los errores de Mongoose y los lanzados desde los services
 * a una respuesta JSON con el código HTTP correcto.
 *
 * @param {Error} err - Error recibido desde next(error).
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
  // Validaciones del schema (required, minlength, enum, match...)
  if (err.name === "ValidationError") {
    const msj = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: msj });
  }

  // ID con formato inválido (por ejemplo /games/hola)
  if (err.name === "CastError") {
    return res.status(400).json({ error: "ID no válido" });
  }

  // Valor duplicado en un campo unique (email, username...)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(", ");
    return res.status(409).json({ error: `Ya existe un registro con ese ${field}` });
  }

  // Errores lanzados desde los services con statusCode
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  if (statusCode >= 500) {
    console.error(err);
  }

  const request = { error: message };

  if (process.env.NODE_ENV === "development") {
    request.stack = err.stack;
  }

  res.status(statusCode).json(request);
};

export default errorHandler;