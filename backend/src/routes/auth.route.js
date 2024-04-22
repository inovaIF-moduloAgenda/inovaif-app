import authController from "../controllers/auth.controller.js";
import authorize from "../middleware/authorize.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/loginAluna", authController.loginAluna);
authRouter.post("/loginProfessora", authController.loginProfessora);
authRouter.post("/cadastroAluna", authController.CadastroAluna);
authRouter.post("/cadastroProfessora", authController.CadastroProfessora);
authRouter.post("/verifica", authController.verificaController);


export default authRouter;