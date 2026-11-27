import gameService from "../services/game.service.js";

// Lista juegos con filtros, ordenacion y paginacion
async function getAll(req, res, next) {
  try {
    const result = await gameService.getAll(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

// Devuelve un juego por su id
async function getById(req, res, next) {
  try {
    const result = await gameService.getById(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

// Crea un juego a nombre del usuario autenticado
async function create(req, res, next) {
  try {
    const result = await gameService.create(req.body, req.usuario);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

// Modifica un juego (solo el dueño o un admin)
async function update(req, res, next) {
  try {
    const result = await gameService.update(req.params.id, req.body, req.usuario);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

// Borra un juego (solo el dueño o un admin)
async function remove(req, res, next) {
  try {
    await gameService.remove(req.params.id, req.usuario);
    res.json({ mensaje: "Juego eliminado" });
  } catch (error) {
    next(error);
  }
}

export default { getAll, getById, create, update, remove };