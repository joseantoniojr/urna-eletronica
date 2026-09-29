import { apiGet, apiPost } from "./api.js";

async function iniciarVotacao(uf) {
	return await apiPost(`/eleicao/iniciar-votacao?uf=${uf}`);
}

async function buscarUFs() {
	return await apiGet("/ufs");
}

async function registrarVoto(cargo, numero, uf) {
	return await apiPost(`/eleicao/votar/${cargo}/${numero}?uf=${uf}`);
}

async function consultarVotacaoAtual() {
	return await apiGet("/eleicao/votacao-atual");
}

async function registrarVotoBranco() {
	return await apiPost("/eleicao/voto-branco");
}

async function registrarVotoNulo() {
	return await apiPost("/eleicao/voto-nulo");
}

async function buscarCandidatoPorNumero(cargo, numero, uf) {
	return await apiGet(`/candidatos/${cargo}/${numero}?uf=${uf}`);
}

async function cancelarVotacao() {
	return await apiPost("/eleicao/cancelar-votacao");
}

async function buscarResultados() {
	return await apiGet("/eleicao/resultados");
}

export {
	iniciarVotacao,
	buscarUFs,
	registrarVoto,
	consultarVotacaoAtual,
	registrarVotoBranco,
	registrarVotoNulo,
	buscarCandidatoPorNumero,
	cancelarVotacao,
	buscarResultados,
};
