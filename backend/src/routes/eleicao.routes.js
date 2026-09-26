import { Router } from "express";
import listarOrdemVotacao from "../controllers/eleicao.controller.js";

const router = Router();

router.get("/ordem-votacao", listarOrdemVotacao);

export default router;
