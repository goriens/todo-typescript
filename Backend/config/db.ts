import mongoose from "mongoose";
const mongoURI =
  "mongodb+srv://FastEasyShare:gaada123@cluster0.ukhca.mongodb.net/bigecom?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

export default mongoose;
