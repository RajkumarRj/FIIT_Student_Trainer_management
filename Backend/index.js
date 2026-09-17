import express from "express";
import { configDotenv } from "dotenv";
import Mongodb from "./config/db.js";
import userRouter from "./routes/Userroutes.js";
import { ErrorHandler } from "./Middleware/Errorhandler.js";

configDotenv();
const app = express();

app.use(express.json())


app.use("/api/v1", userRouter);

app.use(ErrorHandler);



Mongodb()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is up and running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("Database error", err));
