import { useEffect, useState } from "react";

import { NOMES_UF } from "../constants/estados.js";
import { iniciarVotacao, buscarUFs } from "../services/eleicao.js";
import "../styles/inicio.css";

export default function Inicio({ onIniciarVotacao }) {
	const [ufs, setUfs] = useState([]);
	const [ufSelecionada, setUfSelecionada] = useState("");

	useEffect(() => {
		async function carregaUfs() {
			const resposta = await buscarUFs();

			setUfs(resposta);
		}

		carregaUfs();
	}, []);

	async function iniciar() {
		const resposta = await iniciarVotacao(ufSelecionada);
		onIniciarVotacao(resposta);
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
						INICIAR VOTAÇÃO
					</button>
				</div>
			</section>
		</section>
	);
}
