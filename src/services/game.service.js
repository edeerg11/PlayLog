import { Game } from "../models/index.js";
import { buildFilter } from "../utils/filters.js";
import { canModify } from "../utils/permissions.js";

/**
 * Crea un Error con statusCode, el mismo patron que en clase 
 * pero en una función para no repetirlo.
 */
const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Lista juegos con filtros, ordenacion y paginacion.

const getAll = async (query = {}) => {
  // Filtros
  const filter = buildFilter(query);

  // Paginacion: valores por defecto y máximo de 100
  const page = Math.max(parseInt(query.page) || 1, 1);
  const limit = Math.min(parseInt(query.limit) || 10, 100);
  const skip = (page - 1) * limit;

  // Ordenación segura con lista blanca
  const camposPermitidos = ["title", "releaseYear", "createdAt"];
  const sortBy = camposPermitidos.includes(query.sortBy) ? query.sortBy : "createdAt";
  const direction = query.direction === "asc" ? 1 : -1;

  // Las dos consultas a la vez, los juegos de esta pagina y el total
  const [datos, total] = await Promise.all([
    Game.find(filter)
      .populate("owner", "username")
      .sort({ [sortBy]: direction })
      .skip(skip)
      .limit(limit),
    Game.countDocuments(filter),
  ]);

  const totalPaginas = Math.ceil(total / limit);

  return {
    datos,
    meta: {
      totalRegistros: total,
      paginaActual: page,
      totalPaginas,
      registrosPorPagina: limit,
      tieneSiguiente: page < totalPaginas,
      tieneAnterior: page > 1,
    },
  };
};

// Devuelve un juego por su id.
const getById = async (id) => {
  const game = await Game.findById(id).populate("owner", "username");
  if (!game) throw createError("Juego no encontrado", 404);
  return game;
};

// Crea un juego (el owner es siempre el usuario autenticado)
const create = async (data, usuario) => {
  // El owner va despes del spread, si alguien manda "owner" en el body, se sobrescribe
  const game = await Game.create({ ...data, owner: usuario.id });
  return game;
};

// Modifica un juego (solo el dueño o un admin)
const update = async (id, data, usuario) => {
  const game = await Game.findById(id);
  if (!game) throw createError("Juego no encontrado", 404);

  if (!canModify(usuario, game.owner)) {
    throw createError("No puedes modificar un juego que no es tuyo", 403);
  }

  // Nadie puede cambiar el dueño de un juego
  const { owner, ...cambios } = data;

  game.set(cambios);
  await game.save(); // save() ejecuta las validaciones del schema

  return game.populate("owner", "username");
};

// Borra un juego (solo el dueño o un admin)
const remove = async (id, usuario) => {
  const game = await Game.findById(id);
  if (!game) throw createError("Juego no encontrado", 404);

  if (!canModify(usuario, game.owner)) {
    throw createError("No puedes borrar un juego que no es tuyo", 403);
  }

  await game.deleteOne();
  // Borra de la base de datos el juego que ya tenias cargado
};

export default { getAll, getById, create, update, remove };