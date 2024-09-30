import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log(`Server is running on port ${PORT}`);
    })
    .catch((err) => console.error(err));
});
