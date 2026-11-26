import userService from "../services/user.service.js";

/**
 * Devuelve todos los usuarios. Solo accesible para admin.
 */

async function getAll(req, res, next) {
  try {
    const result = await userService.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export default { getAll };