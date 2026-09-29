import { CARGOS } from "../constants/eleicao.js";
import {
	buscarCandidatos,
	buscarCandidatosPorCargo,
	buscarCandidatosPorNumero,
	cargoExiste,
	ufExiste,
} from "../services/candidatos.service.js";

function listarCandidatos(req, res) {
	const dados = buscarCandidatos();

	res.json(dados);
}

function listarCandidatosPorCargo(req, res) {
	const cargo = req.params.cargo.toUpperCase();
	const uf = req.query.uf?.toUpperCase();

	if (!cargoExiste(cargo)) {
		return res.status(400).json({
			erro: "Cargo Inválido",
		});
	}

	if (uf && !ufExiste(uf)) {
		return res.status(400).json({
			erro: "Estado Inválido",
		});
	}

	const candidatos = buscarCandidatosPorCargo(cargo, uf);

	res.json(candidatos);
}

function listarCandidatoPorNumero(req, res) {
	const cargo = req.params.cargo.toUpperCase();
	const numero = req.params.numero;
	const uf = req.query.uf?.toUpperCase();

	if (!cargoExiste(cargo)) {
		return res.status(400).json({
			erro: "Cargo Inválido",
		});
	}

	if (uf && !ufExiste(uf)) {
		return res.status(400).json({
			erro: "Estado Inválido",
		});
	}

	const ufBusca = cargo === CARGOS.PRESIDENTE ? "BR" : uf;

	const candidato = buscarCandidatosPorNumero(cargo, numero, ufBusca);

	if (!candidato) {
		return res.status(404).json({
			erro: "Candidato não encontrado",
		});
	}

	res.status(200).json(candidato);
}

export { listarCandidatos, listarCandidatosPorCargo, listarCandidatoPorNumero };
