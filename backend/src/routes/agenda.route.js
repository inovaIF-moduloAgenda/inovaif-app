import AgendaController from '../controllers/agenda.controller.js'
//import authorize from "../middleware/authorize.js";
import { Router } from "express";

const agendaRouter = Router();
//agendaRouter.use(authorize) //rotas privadas, so entra se tiver token
agendaRouter.get("/datas/:id", AgendaController.getAllDatas)
agendaRouter.get("/dataInscrito/:id", AgendaController.getDataByUser)
agendaRouter.get("/encontroHoje/:id/:dataHoje", AgendaController.getEncontrosToday)

export default agendaRouter;