import { Router } from "express";
import { listarOrdemVotacao, cargoAtual, proximoCargo } from "../controllers/eleicao.controller.js";

const router = Router();

router.get("/ordem-votacao", listarOrdemVotacao);
router.get("/cargo-atual", cargoAtual);
router.get("/proximo-cargo", proximoCargo);

export default router;
