import { Router } from "express";
import {
	listarOrdemVotacao,
	cargoAtual,
	proximoCargo,
	iniciarVotacao,
	registrarVotoController,
	buscarVotosCandidatoController,
	registrarVotoNuloController,
} from "../controllers/eleicao.controller.js";

const router = Router();

router.get("/ordem-votacao", listarOrdemVotacao);
router.get("/cargo-atual", cargoAtual);
router.get("/proximo-cargo", proximoCargo);
router.post("/iniciar-votacao", iniciarVotacao);
router.post("/votar/:cargo/:numero", registrarVotoController);
router.get("/votar/:sqCandidato", buscarVotosCandidatoController);
router.post("/voto-nulo", registrarVotoNuloController);

export default router;
