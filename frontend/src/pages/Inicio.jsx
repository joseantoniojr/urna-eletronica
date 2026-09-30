import { useEffect, useState } from "react";

import { NOMES_UF } from "../constants/estados.js";
import { iniciarVotacao, buscarUFs } from "../services/eleicao.js";
import "../styles/inicio.css";

export default function Inicio({ onIniciarVotacao, avisoInicial = "" }) {
	const [ufs, setUfs] = useState([]);
	const [ufSelecionada, setUfSelecionada] = useState("");
	const [mensagem, setMensagem] = useState("");
	const [iniciando, setIniciando] = useState(false);

	useEffect(() => {
		async function carregaUfs() {
			try {
				const resposta = await buscarUFs();

				setUfs(resposta);
			} catch {
				setMensagem(
					"Não foi possível carregar os estados. O servidor pode estar iniciando: aguarde alguns segundos e atualize a página.",
				);
			}
		}

		carregaUfs();
	}, []);

	async function iniciar() {
		setMensagem("");
		setIniciando(true);

		try {
			const resposta = await iniciarVotacao(ufSelecionada);
			onIniciarVotacao(resposta);
		} catch (erro) {
			if (erro.message.includes("Votação em andamento")) {
				setMensagem("Já existe uma votação em andamento. Aguarde a pessoa terminar e tente novamente.");
			} else {
				setMensagem("Não foi possível iniciar a votação. Tente novamente em instantes.");
			}
		} finally {
			setIniciando(false);
		}
	}

	return (
		<section className='inicio'>
			<section className='inicio__card'>
				<header className='inicio__cabecalho'>
					<span>SIMULAÇÃO DE URNA ELETRÔNICA</span>
					<h1>Eleições Gerais 2026</h1>
					<p>Selecione o estado para iniciar a votação</p>
				</header>

				<div className='inicio__formulario'>
					<label htmlFor='estado'>Estado</label>

					<select
						id='estado'
						value={ufSelecionada}
						onChange={(evento) => setUfSelecionada(evento.target.value)}
					>
						<option value='' disabled>
							Selecione um estado
						</option>

						{[...ufs].sort().map((uf) => (
							<option key={uf} value={uf}>
								{NOMES_UF[uf]} ({uf})
							</option>
						))}
					</select>

					<button type='button' disabled={!ufSelecionada} onClick={iniciar}>
						{iniciando ? "INICIANDO..." : "INICIAR VOTAÇÃO"}
					</button>

					{mensagem && <p className='inicio__mensagem'>{mensagem || avisoInicial}</p>}
				</div>
			</section>
		</section>
	);
}
