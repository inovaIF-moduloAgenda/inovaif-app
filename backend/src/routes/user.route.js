import userController from "../controllers/user.controller.js";
import authorize from "../middleware/authorize.js";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/userAluna", authorize, userController.getUserAluna);
userRouter.get("/userProfessora", authorize, userController.getUserProfessora);
userRouter.get("/allAluno", userController.getAllAluno);
export default userRouter;