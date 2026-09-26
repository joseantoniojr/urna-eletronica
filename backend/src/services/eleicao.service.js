import { CARGOS } from "../constants/eleicao.js";
import { buscarCandidatosPorNumero } from "./candidatos.service.js";

const votos = new Map();
let votosNulos = 0;

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
	const indexAtual = 0;
	const cargoAtual = ordemVotacao[indexAtual];

	return { uf, indexAtual, cargoAtual };
}

function registrarVoto(cargo, numero, uf) {
	const candidato = buscarCandidatosPorNumero(cargo, numero, uf);

	if (!candidato) {
		throw new Error("Candidato não encontrado");
	}

	const chave = candidato.sqCandidato;
	const quantidadeVotos = votos.get(chave) ?? 0;

	votos.set(chave, quantidadeVotos + 1);

	return candidato;
}

function registrarVotoNulo() {
	return ++votosNulos;
}

function buscarVotosCandidato(sqCandidato) {
	return votos.get(sqCandidato) ?? 0;
}

export {
	buscarOrdemVotacao,
	obterCargoAtual,
	obterProximoCargo,
	iniciarVotacaoService,
	registrarVoto,
	buscarVotosCandidato,
	registrarVotoNulo,
};
