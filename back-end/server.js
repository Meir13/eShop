import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./Routes/userRoutes.js";
import { seedRouter } from "./Routes/seedRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/seed", seedRouter);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(PORT);
    console.log(`App running on port ${PORT}!`);
  })
  .catch((err) => console.log(err));
