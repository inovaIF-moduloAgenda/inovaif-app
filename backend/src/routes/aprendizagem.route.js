import aprendizagemController from '../controllers/aprendizagem.controller.js'


import { Router } from 'express'
const aprendizagemRouter = Router();

aprendizagemRouter.get("/getObjetivo/:id", aprendizagemController.getObjetivoByComponente);
aprendizagemRouter.get("/getEtapa/:id", aprendizagemController.getEtapaByObjAprendizagem);


export default aprendizagemRouter;