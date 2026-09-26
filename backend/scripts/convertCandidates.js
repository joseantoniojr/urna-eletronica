import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/consulta_cand_2026_BRASIL.csv");

const csv = fs.readFileSync(filePath, "latin1");

const registros = parse(csv, {
	columns: true,
	delimiter: ";",
});

function encontraRelacionados(candidato) {
	return registros.filter(
		(registro) =>
			registro.SG_UF === candidato.SG_UF &&
			registro.NR_CANDIDATO === candidato.NR_CANDIDATO &&
			registro.SQ_COLIGACAO === candidato.SQ_COLIGACAO,
	);
}

function formataRelacionado(relacionado) {
	return {
		sqCandidato: relacionado.SQ_CANDIDATO,
		nome: relacionado.NM_CANDIDATO,
		nomeUrna: relacionado.NM_URNA_CANDIDATO,
	};
}

function formataResposta(candidato, nomeChave, valorRelacionado) {
	return {
		sqCandidato: candidato.SQ_CANDIDATO,
		numero: candidato.NR_CANDIDATO,
		nome: candidato.NM_CANDIDATO,
		nomeUrna: candidato.NM_URNA_CANDIDATO,
		partido: candidato.SG_PARTIDO,
		cargo: candidato.DS_CARGO,
		uf: candidato.SG_UF,
		[nomeChave]: valorRelacionado,
	};
}

function relacionado(candidato, cargo) {
	const aliados = encontraRelacionados(candidato);

	const aliado = aliados.find((registro) => registro.DS_CARGO === cargo);

	return formataRelacionado(aliado);
}

function formataPresidente(presidente) {
	const vice = relacionado(presidente, "VICE-PRESIDENTE");

	return formataResposta(presidente, "vice", vice);
}

function formataGovernador(governador) {
	const vice = relacionado(governador, "VICE-GOVERNADOR");

	return formataResposta(governador, "vice", vice);
}

function formataSenador(senador) {
	const relacionados = encontraRelacionados(senador);

	const suplentes = relacionados.filter(
		(registro) => registro.DS_CARGO === "1º SUPLENTE" || registro.DS_CARGO === "2º SUPLENTE",
	);

	const suplentesFormatados = suplentes.map((suplente) => {
		return {
			ordem: suplente.DS_CARGO === "1º SUPLENTE" ? 1 : 2,
			sqCandidato: suplente.SQ_CANDIDATO,
			nome: suplente.NM_CANDIDATO,
			nomeUrna: suplente.NM_URNA_CANDIDATO,
		};
	});

	return formataResposta(senador, "suplentes", suplentesFormatados);
}

function formataCandidatos(candidato) {
	return {
		sqCandidato: candidato.SQ_CANDIDATO,
		numero: candidato.NR_CANDIDATO,
		nome: candidato.NM_CANDIDATO,
		nomeUrna: candidato.NM_URNA_CANDIDATO,
		partido: candidato.SG_PARTIDO,
		cargo: candidato.DS_CARGO,
		uf: candidato.SG_UF,
	};
}

const presidentes = registros.filter((registro) => registro.DS_CARGO === "PRESIDENTE");
const governadores = registros.filter((registro) => registro.DS_CARGO === "GOVERNADOR");
const senadores = registros.filter((registro) => registro.DS_CARGO === "SENADOR");
const deputadosFederais = registros.filter((registro) => registro.DS_CARGO === "DEPUTADO FEDERAL");
const deputadosDistritais = registros.filter((registro) => registro.DS_CARGO === "DEPUTADO DISTRITAL");
const deputadosEstaduais = registros.filter((registro) => registro.DS_CARGO === "DEPUTADO ESTADUAL");

const candidatosPresidenciais = presidentes.map((candidato) => formataPresidente(candidato));
const candidatosAoGoverno = governadores.map((candidato) => formataGovernador(candidato));
const candidatosAoSenado = senadores.map((candidato) => formataSenador(candidato));
const candidatosACamaraFederal = deputadosFederais.map((candidato) => formataCandidatos(candidato));
const candidatosACamaraDistrital = deputadosDistritais.map((candidato) => formataCandidatos(candidato));
const candidatosACamaraEstadual = deputadosEstaduais.map((candidato) => formataCandidatos(candidato));

const candidatos = [
	...candidatosPresidenciais,
	...candidatosAoGoverno,
	...candidatosAoSenado,
	...candidatosACamaraFederal,
	...candidatosACamaraDistrital,
	...candidatosACamaraEstadual,
];

const dados = {
	eleicao: 2026,
	candidatos,
};

const caminhoSaida = path.join(__dirname, "../data/candidatos.json");

fs.writeFileSync(caminhoSaida, JSON.stringify(dados, null, 2), "utf-8");
