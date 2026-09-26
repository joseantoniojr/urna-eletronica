import buscarOrdemVotacao from "../services/eleicao.service.js";

function listarOrdemVotacao(req, res) {
	const uf = req.query.uf?.toUpperCase();

	const ordemVotacao = buscarOrdemVotacao(uf);

	res.json(ordemVotacao);
}

export default listarOrdemVotacao;
