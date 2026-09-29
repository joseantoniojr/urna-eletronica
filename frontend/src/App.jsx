import { useEffect, useState } from "react";

import Inicio from "./pages/Inicio.jsx";
import Urna from "./pages/Urna.jsx";
import { buscarResultados, cancelarVotacao, consultarVotacaoAtual } from "./services/eleicao.js";
import Resultados from "./pages/Resultados.jsx";

function App() {
	const [votacao, setVotacao] = useState(null);
	const [pagina, setPagina] = useState("inicio");
	const [votacaoFinalizada, setVotacaoFinalizada] = useState(false);
	const [resultados, setResultados] = useState([]);

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
					onApurarVotos={async () => {
						const dados = await buscarResultados();

						setResultados(dados);
						setPagina("resultados");
					}}
					onVoltarInicio={async () => {
						await cancelarVotacao();

						setVotacao(null);
						setVotacaoFinalizada(false);
						setPagina("inicio");
					}}
					votacaoFinalizada={votacaoFinalizada}
				/>
			)}

			{pagina === "resultados" && <Resultados resultados={resultados} />}
		</main>
	);
}

export default App;
