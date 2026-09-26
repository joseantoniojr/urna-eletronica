import { buscarCandidatos, buscarCandidatosPorCargo, cargoExiste, ufExiste } from "../services/candidatos.service.js";

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

export { listarCandidatos, listarCandidatosPorCargo };
