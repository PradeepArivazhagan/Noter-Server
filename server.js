import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/router.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

dotenv.config();

app.use("/", router);

// Connect to MongoDB

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(port, () => {
      console.log(`Mongo DB is Connected and Server is running on port ${process.env.PORT}`);
    })
  )
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
