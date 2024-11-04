import express from "express";
import cors from "cors";
import env from "dotenv";
import mongoose from "mongoose";
import myRoutes from './routes/api.js'
env.config()

const PORT = process.env.PORT || 6060
const app = express()
//middleware for accepting json file or data
app.use(express.json())
app.use(cors());

//
app.use("/api", myRoutes);
//

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