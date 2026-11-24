import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Schema: los campos y las opciones
const userSchema = new mongoose.Schema(
  {
    // un objeto por cada campo
    username: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
      unique: true,
      trim: true,
      minlength: [3, "El nombre de usuario debe tener al menos 3 caracteres"],
      maxlength: [30, "El nombre de usuario no puede superar 30 caracteres"]
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "El email no es válido"]
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
      select: false
    },
    rol: {
      type: String,
      enum: {values: ["user", "admin"], message: "El rol debe ser user o admin"},
      default: "user"
    },
  },
  {
    timestamps: true, // opciones del schema
  }
);

// Hooks y metodos
userSchema.pre("save", async function () {
  // hashear la contraseña
  return
});

userSchema.methods.checkPassword = async function (plainPassword) {
  // comparar con bcrypt
};

// Crear el modelo y exportarlo
export default mongoose.model("User", userSchema);