import { CARGOS, ORDEM_VOTACAO } from "../constants/eleicao.js";

function buscarOrdemVotacao(uf) {
	const cargoDeputado = uf === "DF" ? CARGOS.DEPUTADO_DISTRITAL : CARGOS.DEPUTADO_ESTADUAL;

	const ordemVotacao = [
		CARGOS.DEPUTADO_FEDERAL,
		cargoDeputado,
		CARGOS.SENADOR,
		CARGOS.SENADOR,
		CARGOS.GOVERNADOR,
		CARGOS.PRESIDENTE,
	];

	return ordemVotacao;
}

function obterCargoAtual(uf, index) {
	const cargosOrdemVotacao = buscarOrdemVotacao(uf);

	if (index < 0 || index >= cargosOrdemVotacao.length) {
		throw new Error("Esse cargo não existe");
	}

	return cargosOrdemVotacao[index];
}

function obterProximoCargo(uf, indexAtual) {
	const cargosOrdemVotacao = buscarOrdemVotacao(uf);

	if (indexAtual + 1 >= cargosOrdemVotacao.length) {
		return null;
	}
	return cargosOrdemVotacao[indexAtual + 1];
}

export { buscarOrdemVotacao, obterCargoAtual, obterProximoCargo };
