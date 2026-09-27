import { buscarCandidatos } from "./candidatos.service.js";

function buscarUFs() {
	const dados = buscarCandidatos();

	const todasUFs = dados.candidatos.map((candidato) => candidato.uf);
	return [...new Set(todasUFs)];
}

export default buscarUFs;
