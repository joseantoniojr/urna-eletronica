import { Router } from "express";
import { listarCandidatos, listarCandidatosPorCargo } from "../controllers/candidatos.controlles.js";

const router = Router();

router.get("/", listarCandidatos);
router.get("/:cargo", listarCandidatosPorCargo);

export default router;
