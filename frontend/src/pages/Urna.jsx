import { useState } from "react";
import { NOMES_UF } from "../constants/estados.js";
import { QTD_DIGITOS_CARGO } from "../constants/cargos.js";
import { consultarVotacaoAtual, registrarVoto, registrarVotoBranco, registrarVotoNulo } from "../services/eleicao.js";

export default function Urna({ votacao, onAtualizarVotacao, onFinalizarVotacao }) {
	const numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
	const [numero, setNumero] = useState("");

	const [votoBranco, setVotoBranco] = useState(false);

	const cargoAtual = votacao.cargoAtual.replaceAll(" ", "_");
	const quantidadeDigitos = QTD_DIGITOS_CARGO[cargoAtual];

	function adicionarNumero(numeroClicado) {
		setNumero((numeroAtual) => {
			if (numeroAtual.length >= quantidadeDigitos) {
				return numeroAtual;
			}
			return numeroAtual + numeroClicado;
		});
	}

	function corrigirNumero() {
		setNumero("");
		setVotoBranco(false);
	}

	async function confirmarVoto() {
		if (votoBranco) {
			await registrarVotoBranco();
		} else {
			if (!numero) {
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
			<p>
				Votando em {NOMES_UF[votacao.uf]} ({votacao.uf})
			</p>

			<section>
				<section>
					<article>
						<header>
							<ol>
								<li>Deputado Federal</li>
								<li>Deputado Estadual</li>
								<li>Senador - 1ª vaga</li>
								<li>Senador - 2ª vaga</li>
								<li>Governador</li>
								<li>Presidente</li>
							</ol>

							<p>Seu voto para</p>
							<h2>{votacao.cargoAtual}</h2>
						</header>
						<section>
							<div>
								<div>
									<div>
										<span>Numero:</span>
										<div>
											<output>{numero}</output>
										</div>
									</div>
									<dl>
										<dt>Nome:</dt>
										<dd>Marina Costa</dd>
										<dt>Partido:</dt>
										<dd>PDN</dd>
									</dl>
									<dl>
										<dt>1º Suplente:</dt>
										<dd>Marina Costa</dd>
										<dt>2º Suplente</dt>
										<dd>Xunda</dd>
									</dl>
								</div>
								<figure>
									{/* <img src='https://api.dicebear.com/10.x/personas/svg' alt='avatar' /> */}
									<figcaption>Deputado Federal</figcaption>
								</figure>
							</div>
						</section>
						<footer>
							<p>Aperte a tecla:</p>
							<p>
								<span>Verde</span> para <strong>Confirmar</strong> este voto
							</p>
							<p>
								<span>Laranja</span> para <strong>Reiniciar</strong> este voto
							</p>
						</footer>
					</article>
				</section>

				<section>
					<section aria-label='Teclado da urna'>
						<div>
							{numeros.map((num) => (
								<button
									key={num}
									type='button'
									onClick={() => {
										adicionarNumero(num);
									}}
								>
									{num}
								</button>
							))}
						</div>

						<div>
							<button
								type='button'
								onClick={() => {
									setNumero("");
									setVotoBranco(true);
								}}
							>
								BRANCO
							</button>

							<button type='button' onClick={corrigirNumero}>
								CORRIGE
							</button>

							<button type='button' onClick={confirmarVoto}>
								CONFIRMA
							</button>
						</div>
					</section>
				</section>
			</section>

			<button type='button'>Voltar ao início</button>
		</section>
	);
}
