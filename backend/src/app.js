import express from "express";
import cors from "cors";
import candRoutes from "./routes/candidatos.routes.js";
import ufsRoutes from "./routes/ufs.routes.js";
import cargosRoutes from "./routes/cargos.routes.js";
import eleicaoRoutes from "./routes/eleicao.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/candidatos", candRoutes);
app.use("/api/ufs", ufsRoutes);
app.use("/api/cargos", cargosRoutes);
app.use("/api/eleicao", eleicaoRoutes);

export default app;
