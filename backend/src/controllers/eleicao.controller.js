import { cargoExiste, ufExiste } from "../services/candidatos.service.js";
import {
	buscarOrdemVotacao,
	buscarResultado,
	buscarTodosOsVotos,
	buscarVotosBrancos,
	buscarVotosCandidato,
	buscarVotosNulos,
	iniciarVotacaoService,
	obterCargoAtual,
	obterProximoCargo,
	obterVotacaoAtual,
	registrarVoto,
	registrarVotoBranco,
	registrarVotoNulo,
} from "../services/eleicao.service.js";

function listarOrdemVotacao(req, res) {
	const uf = req.query.uf?.toUpperCase();

	if (!ufExiste(uf)) {
		return res.status(400).json({
			erro: "Estado inválido",
		});
	}

	const ordemVotacao = buscarOrdemVotacao(uf);

	res.json(ordemVotacao);
}

function cargoAtual(req, res) {
	const uf = req.query.uf?.toUpperCase();
	const index = Number(req.query.index);

	if (!ufExiste(uf)) {
		return res.status(400).json({
			erro: "Estado inválido",
		});
	}

	if (!Number.isInteger(index) || index < 0) {
		return res.status(400).json({
			error: "O parâmetro 'index' deve ser um número inteiro válido e positivo.",
		});
	}

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

	if (!ufExiste(uf)) {
		return res.status(400).json({
			erro: "Estado inválido",
		});
	}

	if (!Number.isInteger(indexAtual) || indexAtual < 0) {
		return res.status(400).json({
			error: "O parâmetro 'index' deve ser um número inteiro válido e positivo.",
		});
	}

	const cargo = obterProximoCargo(uf, indexAtual);

	res.json(cargo);
}

function consultarVotacaoAtual(req, res) {
	const votacao = obterVotacaoAtual();

	res.json(votacao);
}

function iniciarVotacao(req, res) {
	const uf = req.query.uf?.toUpperCase();

	if (!ufExiste(uf)) {
		return res.status(400).json({
			erro: "Estado inválido",
		});
	}
	try {
		const inicia = iniciarVotacaoService(uf);
		res.json(inicia);
	} catch (erro) {
		res.status(400).json({
			erro: erro.message,
		});
	}
}

function registrarVotoController(req, res) {
	const cargo = req.params.cargo?.toUpperCase();
	const numero = req.params.numero;
	const uf = req.query.uf?.toUpperCase();

	if (!cargoExiste(cargo)) {
		return res.status(400).json({
			erro: "Cargo inválido",
		});
	}

	if (!ufExiste(uf)) {
		return res.status(400).json({
			erro: "Estado inválido",
		});
	}

	try {
		const voto = registrarVoto(cargo, numero, uf);

		res.json(voto);
	} catch (erro) {
		res.status(404).json({
			erro: erro.message,
		});
	}
}

function registrarVotoNuloController(req, res) {
	const votosNulos = registrarVotoNulo();

	res.json(votosNulos);
}

function registrarVotoBrancoController(req, res) {
	const votosBrancos = registrarVotoBranco();

	res.json(votosBrancos);
}

function buscarVotosCandidatoController(req, res) {
	const sqCandidato = req.params.sqCandidato;
	const cargo = req.query.cargo?.toUpperCase();
	const uf = req.query.uf?.toUpperCase();

	if (!cargoExiste(cargo)) {
		return res.status(400).json({ erro: "Cargo inválido" });
	}

	if (!ufExiste(uf)) {
		return res.status(400).json({ erro: "Estado inválido" });
	}

	const votos = buscarVotosCandidato(uf, cargo, sqCandidato);

	res.json(votos);
}

function buscarVotosNulosController(req, res) {
	const cargo = req.query.cargo?.toUpperCase();
	const uf = req.query.uf?.toUpperCase();

	if (!cargoExiste(cargo)) {
		return res.status(400).json({ erro: "Cargo inválido" });
	}

	if (!ufExiste(uf)) {
		return res.status(400).json({ erro: "Estado inválido" });
	}

	const votosNulos = buscarVotosNulos(uf, cargo);

	res.json(votosNulos);
}

function buscarVotosBrancosController(req, res) {
	const cargo = req.query.cargo?.toUpperCase();
	const uf = req.query.uf?.toUpperCase();

	if (!cargoExiste(cargo)) {
		return res.status(400).json({ erro: "Cargo inválido" });
	}

	if (!ufExiste(uf)) {
		return res.status(400).json({ erro: "Estado inválido" });
	}

	const votosBrancos = buscarVotosBrancos(uf, cargo);

	res.json(votosBrancos);
}

function buscarTodosOsVotosController(req, res) {
	const votos = buscarTodosOsVotos();

	res.json(votos);
}

function buscarResultadoController(req, res) {
	const resultado = buscarResultado();

	res.json(resultado);
}

export {
	listarOrdemVotacao,
	cargoAtual,
	proximoCargo,
	consultarVotacaoAtual,
	iniciarVotacao,
	registrarVotoController,
	buscarVotosCandidatoController,
	registrarVotoNuloController,
	registrarVotoBrancoController,
	buscarVotosNulosController,
	buscarVotosBrancosController,
	buscarTodosOsVotosController,
	buscarResultadoController,
};
