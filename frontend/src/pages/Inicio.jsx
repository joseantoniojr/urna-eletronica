import { useEffect, useState } from "react";

import { NOMES_UF } from "../constants/estados.js";
import { iniciarVotacao, buscarUFs } from "../services/eleicao.js";

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

	return (
		<>
			<h1>Eleições Gerais 2026</h1>

			<select value={ufSelecionada} onChange={(evento) => setUfSelecionada(evento.target.value)} required>
				<option value='' disabled>
					Selecione um estado
				</option>

				{[...ufs].sort().map((uf) => (
					<option key={uf} value={uf}>
						{NOMES_UF[uf]} ({uf})
					</option>
				))}
			</select>

			<button
				type='button'
				disabled={!ufSelecionada}
				onClick={async () => {
					const resposta = await iniciarVotacao(ufSelecionada);
					onIniciarVotacao(resposta);
				}}
			>
				Iniciar votação
			</button>
		</>
	);
}
