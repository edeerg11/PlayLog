import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

/**
 * Genera un JWT con el id y el rol del usuario.
 * @param {Object} user - Documento del usuario.
 * @returns {string} Token firmado.
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

/**
 * Registra un usuario nuevo
 * @param {Object} datos - { username, email, password }
 * @returns {Promise<Object>} { usuario, token }
 * @throws {Error} 409 si el email ya está registrado.
 */
const register = async ({ username, email, password }) => {
  const existente = await User.findOne({ email });
  if (existente) {
    const error = new Error("Ya existe un usuario con ese email");
    error.statusCode = 409;
    throw error;
  }

  // La contraseña se hashea sola en el hook pre("save") del modelo
  const user = await User.create({ username, email, password });

  const token = generateToken(user);

  // create() devuelve el documento con la password: la quitamos antes de responder
  const { password: _, ...usuarioSinPassword } = user.toObject();

  return { usuario: usuarioSinPassword, token };
};

/**
 * Comprueba las credenciales y devuelve un token.
 * @param {Object} datos - { email, password }
 * @returns {Promise<Object>} { token }
 * @throws {Error} 401 si las credenciales no son correctas.
 */
const login = async ({ email, password }) => {
  // select("+password") porque en el modelo tiene select: false
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const error = new Error("Credenciales incorrectas");
    error.statusCode = 401;
    throw error;
  }

  const coinciden = await user.checkPassword(password);
  if (!coinciden) {
    const error = new Error("Credenciales incorrectas");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user);
  return { token };
};

/**
 * Devuelve todos los usuarios (sin contraseña).
 * @returns {Promise<Array>} Lista de usuarios.
 */
const getAll = async () => {
  return User.find();
};

export default { register, login, getAll };