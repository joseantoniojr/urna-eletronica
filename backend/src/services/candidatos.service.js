import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caminhoArquivo = path.join(__dirname, "../../data/candidatos.json");

const cargosValidos = [
	"PRESIDENTE",
	"GOVERNADOR",
	"SENADOR",
	"DEPUTADO FEDERAL",
	"DEPUTADO ESTADUAL",
	"DEPUTADO DISTRITAL",
];

const ufsValidos = [
	"AC",
	"AL",
	"AP",
	"AM",
	"BA",
	"CE",
	"DF",
	"ES",
	"GO",
	"MA",
	"MT",
	"MS",
	"MG",
	"PA",
	"PB",
	"PR",
	"PE",
	"PI",
	"RJ",
	"RN",
	"RS",
	"RO",
	"RR",
	"SC",
	"SP",
	"SE",
	"TO",
];

function buscarCandidatos() {
	const arquivo = fs.readFileSync(caminhoArquivo, "utf-8");

	return JSON.parse(arquivo);
}

function cargoExiste(cargo) {
	return cargosValidos.includes(cargo);
}

function ufExiste(uf) {
	return ufsValidos.includes(uf);
}

function buscarCandidatosPorCargo(cargo, uf) {
	const dados = buscarCandidatos();

	return dados.candidatos.filter((candidato) => {
		const correspondenteAoCargo = candidato.cargo === cargo;

		if (!uf) return correspondenteAoCargo;

		return correspondenteAoCargo && candidato.uf === uf;
	});
}

function buscarCandidatosPorNumero(cargo, numero, uf) {
	const dados = buscarCandidatos();

	return dados.candidatos.find((candidato) => {
		const correspondenteAoCargo = candidato.cargo === cargo;
		const correspondenteAoNumero = candidato.numero === numero;

		if (!uf) return correspondenteAoCargo && correspondenteAoNumero;

		return correspondenteAoCargo && correspondenteAoNumero && candidato.uf === uf;
	});
}

export { cargoExiste, ufExiste, buscarCandidatos, buscarCandidatosPorCargo, buscarCandidatosPorNumero };
