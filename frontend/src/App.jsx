import { useEffect, useState } from "react";

import Inicio from "./pages/Inicio.jsx";
import Urna from "./pages/Urna.jsx";
import { cancelarVotacao, consultarVotacaoAtual } from "./services/eleicao.js";

function App() {
	const [votacao, setVotacao] = useState(null);
	const [pagina, setPagina] = useState("inicio");
	const [votacaoFinalizada, setVotacaoFinalizada] = useState(false);

	useEffect(() => {
		async function recuperarVotacao() {
			const votacaoAtual = await consultarVotacaoAtual();

			if (!votacaoAtual) return;

			setVotacao(votacaoAtual);
			setPagina("urna");
		}

		recuperarVotacao();
	}, []);

	return (
		<main>
			{pagina === "inicio" && (
				<Inicio
					onIniciarVotacao={(dados) => {
						setVotacao(dados);
						setPagina("urna");
					}}
				/>
			)}

			{pagina === "urna" && (
				<Urna
					votacao={votacao}
					onAtualizarVotacao={setVotacao}
					onFinalizarVotacao={() => setVotacaoFinalizada(true)}
					onVoltarInicio={async () => {
						await cancelarVotacao();

						setVotacao(null);
						setVotacaoFinalizada(false);
						setPagina("inicio");
					}}
					votacaoFinalizada={votacaoFinalizada}
				/>
			)}
		</main>
	);
}

export default App;
