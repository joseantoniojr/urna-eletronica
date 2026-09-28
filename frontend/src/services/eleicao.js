import { apiGet, apiPost } from "./api.js";

async function iniciarVotacao(uf) {
	return await apiPost(`/eleicao/iniciar-votacao?uf=${uf}`);
}

async function buscarUFs() {
	return await apiGet("/ufs");
}

export { iniciarVotacao, buscarUFs };
