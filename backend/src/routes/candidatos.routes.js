import { Router } from "express";
import {
	listarCandidatoPorNumero,
	listarCandidatos,
	listarCandidatosPorCargo,
} from "../controllers/candidatos.controlles.js";

const router = Router();

router.get("/", listarCandidatos);
router.get("/:cargo", listarCandidatosPorCargo);
router.get("/:cargo/:numero", listarCandidatoPorNumero);

export default router;
