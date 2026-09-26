import {
	buscarOrdemVotacao,
	buscarVotosCandidato,
	iniciarVotacaoService,
	obterCargoAtual,
	obterProximoCargo,
	registrarVoto,
} from "../services/eleicao.service.js";

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

function iniciarVotacao(req, res) {
	const uf = req.query.uf?.toUpperCase();

	const inicia = iniciarVotacaoService(uf);

	res.json(inicia);
}

function registrarVotoController(req, res) {
	const cargo = req.params.cargo?.toUpperCase();
	const numero = req.params.numero;
	const uf = req.query.uf?.toUpperCase();

	try {
		const voto = registrarVoto(cargo, numero, uf);

		res.json(voto);
	} catch (erro) {
		res.status(404).json({
			erro: erro.message,
		});
	}
}

function buscarVotosCandidatoController(req, res) {
	const sqCandidato = req.params.sqCandidato;

	const votos = buscarVotosCandidato(sqCandidato);

	res.json(votos);
}

export { listarOrdemVotacao, cargoAtual, proximoCargo, iniciarVotacao, registrarVotoController, buscarVotosCandidatoController };
