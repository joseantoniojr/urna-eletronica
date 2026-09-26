import buscarCargos from "../services/cargos.service.js";

function listarCargos(req, res) {
	const cargos = buscarCargos();
	res.json(cargos);
}

export default listarCargos;
