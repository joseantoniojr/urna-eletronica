import { Router } from "express";
import listarCargos from "../controllers/cargos.controller.js";

const router = Router();

router.get("/", listarCargos);

export default router;
