import { CARGOS, ORDEM_VOTACAO } from "../constants/eleicao.js";
import { cargoAtual } from "../controllers/eleicao.controller.js";

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

function iniciarVotacaoService(uf) {
	const ordemVotacao = buscarOrdemVotacao(uf);
	let indexAtual = 0;
	const cargoAtual = ordemVotacao[indexAtual];

	return { uf, indexAtual, cargoAtual };
}

export { buscarOrdemVotacao, obterCargoAtual, obterProximoCargo, iniciarVotacaoService };
