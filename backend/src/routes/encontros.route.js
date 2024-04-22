import encontrosController from '../controllers/encontros.controller.js'
import authorize from "../middleware/authorize.js";

import { Router } from "express";

const encontrosRouter = Router();
// ISSO PODERA SER ACESSADO APENAS DEPOIS DA AUTENTETICAÇÃO 
    //PROFESSOR
//encontrosRouter.use(authorize) //rotas privadas, so entra se tiver token(testar separadamente para professor)
encontrosRouter.post("/create", encontrosController.createEncontro);
encontrosRouter.get("/encontrosCadastrados/:id", encontrosController.getAllEncontrosCadastrados);
encontrosRouter.get("/myCadastros/:id", encontrosController.getMyCadastros);
encontrosRouter.get("/editCadastro/:id/:id_encontro", encontrosController.getEditCadastro);
encontrosRouter.put("/updateEncontro/:id", encontrosController.updateEncontroById);
encontrosRouter.delete("/deleteEncontro/:id", encontrosController.deleteEncontroById);

    //ALUNO
encontrosRouter.get("/encontrosDisponivel/:dataHoje/:id", encontrosController.getAllEncontrosDisponivel);




export default encontrosRouter;