import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import User from "./user.model.js";
import Game from "./game.model.js";

export { User, Game };

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();