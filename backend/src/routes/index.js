import { Router } from "express";
import authRouter from './auth.route.js'
import encontrosRouter from './encontros.route.js'
import aprendizagemRouter from './aprendizagem.route.js'
import agendaRouter from './agenda.route.js'
import inscricaoRouter from './inscricao.route.js';
import userRouter from './user.route.js'

const router = Router();
router.use("/auth", authRouter);
router.use("/encontros", encontrosRouter);
router.use("/aprendizagem", aprendizagemRouter);
router.use("/agenda", agendaRouter);
router.use("/inscricao", inscricaoRouter);
router.use("/user", userRouter);

export default router;

// router.use("/doc", swaggerRouter);