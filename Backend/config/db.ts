import mongoose from "mongoose";
const mongoURI = "mongodb://127.0.0.1:27017/w3todo";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

export default mongoose;
