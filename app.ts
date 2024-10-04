import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/user";
import productRoutes from "./routes/product";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(cors());

app.use("/api", userRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log(`Server is running on port ${PORT}`);
    })
    .catch((err) => console.error(err));
});
