/**
 * Comprueba si un usuario puede modificar o borrar un recurso.
 * Puede si es admin o si es el dueño del recurso.
 */
const canModify = (usuario, ownerId) => {
  if (!usuario || !ownerId) return false;
  if (usuario.rol === "admin") return true;
  return ownerId.toString() === usuario.id;
};

export { canModify };