import mongoose from "mongoose";

const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DB,
  MONGO_AUTH_SOURCE,
} = process.env;

const buildMongoUri = () => {
  const user = encodeURIComponent(MONGO_USER);
  const password = encodeURIComponent(MONGO_PASSWORD);
  return `mongodb://${user}:${password}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_AUTH_SOURCE}`;
};

const connectDB = async () => {
  try {
    await mongoose.connect(buildMongoUri());
    console.log(`Conectado a MongoDB (${MONGO_DB}@${MONGO_HOST})`);
  } catch (error) {
    console.error("Error de conexión:", error.message);
    process.exit(1);
  }
};

export default connectDB;
