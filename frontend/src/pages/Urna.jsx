import { useEffect, useState } from "react";
import { QTD_DIGITOS_CARGO } from "../constants/cargos.js";
import {
	buscarCandidatoPorNumero,
	consultarVotacaoAtual,
	registrarVoto,
	registrarVotoBranco,
	registrarVotoNulo,
} from "../services/eleicao.js";
import TecladoNumerico from "../components/urna/TecladoNumerico.jsx";
import TelaVotacao from "../components/urna/TelaVotacao.jsx";
import IdentificacaoVotacao from "../components/urna/IdentificacaoVotacao.jsx";

export default function Urna({ votacao, onAtualizarVotacao, onFinalizarVotacao }) {
	const numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
	const [numero, setNumero] = useState("");
	const [candidato, setCandidato] = useState(null);

	const [votoBranco, setVotoBranco] = useState(false);

	const cargoAtualFormato = votacao.cargoAtual.replaceAll(" ", "_");
	const quantidadeDigitos = QTD_DIGITOS_CARGO[cargoAtualFormato];

	useEffect(() => {
		if (numero.length !== quantidadeDigitos) {
			return;
		}

		async function buscar() {
			try {
				const resposta = await buscarCandidatoPorNumero(votacao.cargoAtual, numero, votacao.uf);

				setCandidato(resposta);
			} catch {
				setCandidato(null);
			}
		}

		buscar();
	}, [numero, quantidadeDigitos, votacao.cargoAtual, votacao.uf]);

	function adicionarNumero(numeroClicado) {
		setVotoBranco(null);

		setNumero((numeroAtual) => {
			if (numeroAtual.length >= quantidadeDigitos) {
				return numeroAtual;
			}
			return numeroAtual + numeroClicado;
		});
	}

	function corrigirNumero() {
		setNumero("");
		setCandidato(null);
		setVotoBranco(false);
	}

	async function confirmarVoto() {
		if (votoBranco) {
			await registrarVotoBranco();
		} else {
			if (numero.length === quantidadeDigitos && !candidato) {
				await registrarVotoNulo();
			} else {
				await registrarVoto(votacao.cargoAtual, numero, votacao.uf);
			}
		}

		const novaVotacao = await consultarVotacaoAtual();

		if (!novaVotacao) {
			onFinalizarVotacao();
			return;
		}

		onAtualizarVotacao(novaVotacao);

		setNumero("");
		setVotoBranco(false);
	}

	return (
		<section>
			<IdentificacaoVotacao uf={votacao.uf} />

			<TelaVotacao
				cargoAtual={votacao.cargoAtual}
				numero={numero}
				candidato={candidato}
				quantidadeDigitos={quantidadeDigitos}
				votoBranco={votoBranco}
				indexAtual={votacao.indexAtual}
				uf={votacao.uf}
			/>

			<TecladoNumerico
				numeros={numeros}
				adicionarNumero={adicionarNumero}
				corrigirNumero={corrigirNumero}
				confirmarVoto={confirmarVoto}
				setNumero={setNumero}
				setVotoBranco={setVotoBranco}
				setCandidato={setCandidato}
			/>

			<button type='button'>Voltar ao início</button>
		</section>
	);
}
