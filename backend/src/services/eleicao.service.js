import { CARGOS } from "../constants/eleicao.js";
import { buscarCandidatosPorNumero, buscarCandidatosPorSq } from "./candidatos.service.js";

const resultados = new Map();

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

function obterOuCriarResultado(uf, cargo) {
	const chave = `${uf}:${cargo}`;

	if (!resultados.has(chave)) {
		resultados.set(chave, {
			candidatos: new Map(),
			brancos: 0,
			nulos: 0,
		});
	}

	return resultados.get(chave);
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
	if (votacaoAtual) throw new Error("Votação em andamento");

	const ordemVotacao = buscarOrdemVotacao(uf);
	const indexAtual = 0;
	const cargoAtual = ordemVotacao[indexAtual];
	const votosEleitor = [];

	votacaoAtual = { uf, indexAtual, cargoAtual, votosEleitor };

	return votacaoAtual;
}

function avancarVotacao() {
	const proximoCargo = obterProximoCargo(votacaoAtual.uf, votacaoAtual.indexAtual);

	if (!proximoCargo) {
		votacaoAtual = null;
		return null;
	}

	votacaoAtual.indexAtual += 1;
	votacaoAtual.cargoAtual = proximoCargo;

	return votacaoAtual;
}

function registrarVoto(cargo, numero, uf) {
	if (!votacaoAtual) throw new Error("Nenhuma votação em andamento");

	if (cargo !== votacaoAtual.cargoAtual) throw new Error("Cargo diferente do cargo atual da votação");

	if (votacaoAtual.uf !== uf) throw new Error("Estado diferente do estado atual da votação");

	const ufBusca = cargo === CARGOS.PRESIDENTE ? "BR" : uf;

	const candidato = buscarCandidatosPorNumero(cargo, numero, ufBusca);
	if (!candidato) throw new Error("Candidato não encontrado");

	if (votacaoAtual.votosEleitor.includes(candidato.sqCandidato) && votacaoAtual.cargoAtual === CARGOS.SENADOR)
		throw new Error("Não pode votar no mesmo candidato mais de 1 vez");

	const resultado = obterOuCriarResultado(uf, cargo);

	const chave = candidato.sqCandidato;
	const quantidadeVotos = resultado.candidatos.get(chave) ?? 0;

	resultado.candidatos.set(chave, quantidadeVotos + 1);

	votacaoAtual.votosEleitor.push(candidato.sqCandidato);

	avancarVotacao();

	return candidato;
}

function registrarVotoNulo() {
	if (!votacaoAtual) throw new Error("Nenhuma votação em andamento");

	const uf = votacaoAtual.uf;
	const cargo = votacaoAtual.cargoAtual;

	const resultado = obterOuCriarResultado(votacaoAtual.uf, votacaoAtual.cargoAtual);

	resultado.nulos++;

	avancarVotacao();

	return {
		tipo: "NULO",
		uf,
		cargo,
	};
}

function registrarVotoBranco() {
	if (!votacaoAtual) throw new Error("Nenhuma votação em andamento");

	const uf = votacaoAtual.uf;
	const cargo = votacaoAtual.cargoAtual;

	const resultado = obterOuCriarResultado(votacaoAtual.uf, votacaoAtual.cargoAtual);

	resultado.brancos++;

	avancarVotacao();

	return {
		tipo: "BRANCO",
		uf,
		cargo,
	};
}

function buscarVotosPorContexto(uf, cargo) {
	const chave = `${uf}:${cargo}`;

	return resultados.get(chave);
}

function buscarVotosNulos(uf, cargo) {
	const resultado = buscarVotosPorContexto(uf, cargo);

	return resultado?.nulos ?? 0;
}

function buscarVotosBrancos(uf, cargo) {
	const resultado = buscarVotosPorContexto(uf, cargo);

	return resultado?.brancos ?? 0;
}

function buscarVotosCandidato(uf, cargo, sqCandidato) {
	const resultado = buscarVotosPorContexto(uf, cargo);

	return resultado?.candidatos?.get(sqCandidato) ?? 0;
}

function buscarTodosOsVotos() {
	const todoOsVotos = Array.from(resultados.entries()).map(([chaveCompleta, dados]) => {
		const [uf, cargo] = chaveCompleta.split(":");

		const votosCandidados = Array.from(dados.candidatos.entries());

		return {
			uf,
			cargo,
			votos: votosCandidados,
			brancos: dados.brancos,
			nulos: dados.nulos,
		};
	});

	return todoOsVotos;
}

function buscarResultado() {
	const votos = buscarTodosOsVotos();

	return votos.map((resultado) => {
		const candidatos = resultado.votos.map(([sqCandidato, quantidadeVotos]) => {
			const candidato = buscarCandidatosPorSq(sqCandidato);

			return {
				sqCandidato: candidato.sqCandidato,
				numero: candidato.numero,
				nomeUrna: candidato.nomeUrna,
				partido: candidato.partido,
				votos: quantidadeVotos,
			};
		});

		return {
			uf: resultado.uf,
			cargo: resultado.cargo,
			candidatos,
			brancos: resultado.brancos,
			nulos: resultado.nulos,
		};
	});
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
