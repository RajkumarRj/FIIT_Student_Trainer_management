import express from "express"
import { login, registerStudent, registerTrainer } from "../controller/UserController.js";

const userRouter = express.Router();


userRouter.post("/register/student", registerStudent);

userRouter.post("/register/trainer", registerTrainer);


userRouter.post("/login", login);
export default userRouter;