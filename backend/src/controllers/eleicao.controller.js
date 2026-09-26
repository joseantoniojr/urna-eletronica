import { buscarOrdemVotacao, obterCargoAtual, obterProximoCargo } from "../services/eleicao.service.js";

function listarOrdemVotacao(req, res) {
	const uf = req.query.uf?.toUpperCase();

	const ordemVotacao = buscarOrdemVotacao(uf);

	res.json(ordemVotacao);
}

function cargoAtual(req, res) {
	const uf = req.query.uf?.toUpperCase();
	const index = Number(req.query.index);

	try {
		const cargo = obterCargoAtual(uf, index);
		res.json(cargo);
	} catch (erro) {
		res.status(400).json({
			erro: erro.message,
		});
	}
}

function proximoCargo(req, res) {
	const uf = req.query.uf?.toUpperCase();
	const indexAtual = Number(req.query.index);

	const cargo = obterProximoCargo(uf, indexAtual);

	res.json(cargo);
}

export { listarOrdemVotacao, cargoAtual, proximoCargo };
