import mongoose from "mongoose";

// Sub-schema embebido: plataformas
const platformSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "La plataforma es obligatoria"],
      enum: {
        values: ["PC", "PS5", "PS4", "Xbox Series", "Xbox One", "Switch"],
        message: "Plataforma no válida",
      },
    },
    price: {
      type: Number,
      min: [0, "El precio no puede ser negativo"],
    },
    releaseDate: {
      type: Date,
    },
  },
  { _id: false }
);

// Schema principal: juego
const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      maxlength: [100, "El título no puede superar 100 caracteres"],
    },
    description: {
      type: String,
      maxlength: [1000, "La descripción no puede superar 1000 caracteres"],
    },
    developer: {
      type: String,
      trim: true,
    },
    releaseYear: {
      type: Number,
      min: [1970, "El año no puede ser anterior a 1970"],
      max: [2030, "El año no puede ser posterior a 2030"],
    },
    pegi: {
      type: Number,
      enum: {
        values: [3, 7, 12, 16, 18],
        message: "PEGI no válido",
      },
    },
    genres: [
      {
        type: String,
        enum: {
          values: ["accion", "aventura", "rpg", "shooter", "estrategia", "deportes", "plataformas", "puzzle", "carreras", "lucha"],
          message: "Género no válido",
        },
      },
    ],
    platforms: [platformSchema],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Game", gameSchema);