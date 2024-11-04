import express from "express";
import cors from "cors";
import env from "dotenv";
import mongoose from "mongoose";
env.config()

const PORT = process.env.PORT || 6060
const app = express()
app.use(cors())

//middleware for accepting json file or data
app.use(express.json())





























mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MONGO DB");
    app.listen(PORT, (error) => {
      error
        ? console.log("Something went wrong with the port:", PORT)
        : console.log(`Server is listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Cannot connect to DB: ", error);
  });