import { Router } from "express";
import { loginUser, registerUser } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

export default userRouter;
