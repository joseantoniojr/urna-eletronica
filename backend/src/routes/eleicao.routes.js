import { Router } from "express";
import {
	listarOrdemVotacao,
	cargoAtual,
	proximoCargo,
	iniciarVotacao,
	registrarVotoController,
	buscarVotosCandidatoController,
} from "../controllers/eleicao.controller.js";

const router = Router();

router.get("/ordem-votacao", listarOrdemVotacao);
router.get("/cargo-atual", cargoAtual);
router.get("/proximo-cargo", proximoCargo);
router.get("/iniciar-votacao", iniciarVotacao);
router.get("/votar/:cargo/:numero", registrarVotoController);
router.get("/votar/:sqCandidato", buscarVotosCandidatoController);

export default router;
