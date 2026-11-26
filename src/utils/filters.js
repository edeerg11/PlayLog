/**
 * Construye el filtro de Mongoose para listar juegos a partir de los query params.
 * Ignora los parámetros desconocidos y los numeros no validos.
 */
const buildFilter = (query = {}) => {
  const filter = {};

  if (query.genre) {
    filter.genres = query.genre;
  }

  if (query.platform) {
    filter["platforms.name"] = query.platform;
  }

  const minYear = Number(query.minYear);
  const maxYear = Number(query.maxYear);

  if (query.minYear && !Number.isNaN(minYear)) {
    filter.releaseYear = { ...filter.releaseYear, $gte: minYear };
  }
  if (query.maxYear && !Number.isNaN(maxYear)) {
    filter.releaseYear = { ...filter.releaseYear, $lte: maxYear };
  }

  if (query.search) {
    filter.title = { $regex: escapeRegex(query.search), $options: "i" };
  }

  return filter;
};

/**
 * Escapa los caracteres especiales de una expresión regular.
 */
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export { buildFilter };