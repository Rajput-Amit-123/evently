import mongoose from "mongoose";

const mongodbUri = process.env.MONGO_URI;

const cashed = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cashed.conn) return cashed.conn;
  
  if (!mongodbUri) throw new Error("MongoDb Uri is Mismatched or Missing");

  cashed.promise = cashed.promise || mongoose.connect(mongodbUri, {
      dbName: "Evently",
      bufferCommands: false,
    });

  cashed.conn = await cashed.promise;
  
  return cashed.conn;
};
