import mongoose from "mongoose";

const connection = {} as any;
async function dbConnect() {
 mongoose.set("strictQuery", true);
 if (connection.isConnected) {
  return;
 }
 try {
  const db = await mongoose.connect(process.env.MONGODB_URI as string, {});
  connection.isConnected = db.connections[0].readyState;
 } catch (error) {
  console.error("Error connecting to database: ", error);
 }
}

export default dbConnect;
