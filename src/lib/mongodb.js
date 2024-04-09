import mongoose from "mongoose";

const connect = async () => {
  try {
    // Verificar si hay una conexión previa establecida
    if (mongoose.connections.length > 0) {
      const readyState = mongoose.connections[0].readyState;
      if (readyState === 1 || readyState === 2) {
        console.log("Already connected to MongoDB.");
        return;
      }
    }

    // Si no hay conexión previa, conectar a MongoDB
    mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    console.error("Error connecting to Mongoose:", error);
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;
