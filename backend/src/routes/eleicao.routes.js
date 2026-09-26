import { Router } from "express";
import { listarOrdemVotacao, cargoAtual, proximoCargo, iniciarVotacao } from "../controllers/eleicao.controller.js";

const router = Router();

router.get("/ordem-votacao", listarOrdemVotacao);
router.get("/cargo-atual", cargoAtual);
router.get("/proximo-cargo", proximoCargo);
router.get("/iniciar-votacao", iniciarVotacao);

export default router;
