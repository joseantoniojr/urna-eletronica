import { Router } from "express";
import listarUFs from "../controllers/ufs.controller.js";

const router = Router();

router.get("/", listarUFs);

export default router;
