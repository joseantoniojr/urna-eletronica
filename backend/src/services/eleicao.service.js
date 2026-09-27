import { CARGOS } from "../constants/eleicao.js";
import { buscarCandidatosPorNumero } from "./candidatos.service.js";

const votos = new Map();

let votosNulos = 0;
let votosBrancos = 0;
let votacaoAtual = null;

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

function obterVotacaoAtual() {
	return votacaoAtual;
}

function iniciarVotacaoService(uf) {
	const ordemVotacao = buscarOrdemVotacao(uf);
	const indexAtual = 0;
	const cargoAtual = ordemVotacao[indexAtual];
	const votosEleitor = [];

	votacaoAtual = { uf, indexAtual, cargoAtual, votosEleitor };

	return votacaoAtual;
}

function registrarVoto(cargo, numero, uf) {
	if (!votacaoAtual) throw new Error("Nenhuma votação em andamento");

	if (cargo !== votacaoAtual.cargoAtual) throw new Error("Cargo diferente do cargo atual da votação");

	const ufBusca = cargo === "PRESIDENTE" ? "BR" : uf;

	const candidato = buscarCandidatosPorNumero(cargo, numero, ufBusca);

	if (!candidato) throw new Error("Candidato não encontrado");

	if (votacaoAtual.uf !== uf) throw new Error("Estado diferente do estado atual da votação");

	if (votacaoAtual.votosEleitor.includes(candidato.sqCandidato) && votacaoAtual.cargoAtual === "SENADOR")
		throw new Error("Não pode votar no mesmo candidato mais de 1 vez");

	const chave = candidato.sqCandidato;
	const quantidadeVotos = votos.get(chave) ?? 0;

	votos.set(chave, quantidadeVotos + 1);

	const proximoCargo = obterProximoCargo(votacaoAtual.uf, votacaoAtual.indexAtual);

	votacaoAtual.votosEleitor.push(candidato.sqCandidato);

	if (!proximoCargo) {
		votacaoAtual = null;
		return null;
	}

	votacaoAtual.indexAtual += 1;
	votacaoAtual.cargoAtual = proximoCargo;

	return candidato;
}

function registrarVotoNulo() {
	return ++votosNulos;
}

function registrarVotoBranco() {
	return ++votosBrancos;
}

function buscarVotosCandidato(sqCandidato) {
	return votos.get(sqCandidato) ?? 0;
}

function buscarVotosNulos() {
	return votosNulos;
}

function buscarVotosBrancos() {
	return votosBrancos;
}

function buscarTodosOsVotos() {
	return Array.from(votos.entries());
}

function buscarResultado() {
	const votos = buscarTodosOsVotos();
	const votosNulos = buscarVotosNulos();
	const votosBrancos = buscarVotosBrancos();

	return { votos, votosNulos, votosBrancos };
}

export {
	buscarOrdemVotacao,
	obterCargoAtual,
	obterProximoCargo,
	obterVotacaoAtual,
	iniciarVotacaoService,
	registrarVoto,
	registrarVotoNulo,
	registrarVotoBranco,
	buscarVotosCandidato,
	buscarVotosNulos,
	buscarVotosBrancos,
	buscarTodosOsVotos,
	buscarResultado,
};
