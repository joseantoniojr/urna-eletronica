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
import { tocarSom } from "../services/sons.js";
import "../styles/urna/urna.css";
import "../styles/urna/telaVotacao.css";
import "../styles/urna/candidato.css";
import "../styles/urna/teclado.css";

export default function Urna({ votacao, onAtualizarVotacao, onFinalizarVotacao, onVoltarInicio, votacaoFinalizada }) {
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

		tocarSom("confirma");

		const novaVotacao = await consultarVotacaoAtual();

		if (!novaVotacao) {
			tocarSom("fim");
			onFinalizarVotacao();
			return;
		}

		onAtualizarVotacao(novaVotacao);

		setNumero("");
		setVotoBranco(false);
	}

	return (
		<section className='container'>
			<IdentificacaoVotacao uf={votacao.uf} />

			<div className='urna__corpo'>
				<TelaVotacao
					cargoAtual={votacao.cargoAtual}
					numero={numero}
					candidato={candidato}
					quantidadeDigitos={quantidadeDigitos}
					votoBranco={votoBranco}
					indexAtual={votacao.indexAtual}
					uf={votacao.uf}
					votacaoFinalizada={votacaoFinalizada}
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
			</div>

			<button className='urna__voltar' type='button' onClick={onVoltarInicio}>
				Voltar ao início
			</button>
		</section>
	);
}
