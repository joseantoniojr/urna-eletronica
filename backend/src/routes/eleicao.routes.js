import { Router } from "express";
import {
	listarOrdemVotacao,
	cargoAtual,
	proximoCargo,
	iniciarVotacao,
	registrarVotoController,
	buscarVotosCandidatoController,
	registrarVotoNuloController,
	registrarVotoBrancoController,
	buscarVotosNulosController,
	buscarVotosBrancosController,
	buscarTodosOsVotosController,
} from "../controllers/eleicao.controller.js";

const router = Router();

router.get("/ordem-votacao", listarOrdemVotacao);
router.get("/cargo-atual", cargoAtual);
router.get("/proximo-cargo", proximoCargo);
router.post("/iniciar-votacao", iniciarVotacao);
router.post("/votar/:cargo/:numero", registrarVotoController);
router.get("/votar/:sqCandidato", buscarVotosCandidatoController);
router.post("/voto-nulo", registrarVotoNuloController);
router.post("/voto-branco", registrarVotoBrancoController);
router.get("/votos-nulos", buscarVotosNulosController);
router.get("/votos-brancos", buscarVotosBrancosController);
router.get("/votos", buscarTodosOsVotosController);

export default router;
