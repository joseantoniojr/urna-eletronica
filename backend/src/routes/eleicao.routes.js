import { Router } from "express";
import { listarOrdemVotacao, cargoAtual } from "../controllers/eleicao.controller.js";

const router = Router();

router.get("/ordem-votacao", listarOrdemVotacao);
router.get("/cargo-atual", cargoAtual);

export default router;
