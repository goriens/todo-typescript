import express from "express";
import bodyParser from "body-parser";
import todoRouter from "./routes/todos";
import cors from "cors";
import "./config/db"; //mongodb

const app = express();
app.use(cors());
const PORT = 8080;

// Parse incoming JSON requests
app.use(bodyParser.json());

// API Routes
app.use("/api", todoRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
