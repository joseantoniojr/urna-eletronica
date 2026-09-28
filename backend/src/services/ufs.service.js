import { buscarCandidatos } from "./candidatos.service.js";

function buscarUFs() {
	const dados = buscarCandidatos();

	const todasUFs = dados.candidatos.filter((candidato) => candidato.uf !== "BR").map((candidato) => candidato.uf);
	return [...new Set(todasUFs)];
}

export default buscarUFs;
