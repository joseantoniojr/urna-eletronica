import { useEffect, useState } from "react";

import Inicio from "./pages/Inicio.jsx";
import Urna from "./pages/Urna.jsx";
import { buscarResultados, cancelarVotacao, consultarVotacaoAtual } from "./services/eleicao.js";
import Resultados from "./pages/Resultados.jsx";

const CHAVE_VOTANDO = "votandoNesteNavegador";

function App() {
	const [votacao, setVotacao] = useState(null);
	const [pagina, setPagina] = useState("inicio");
	const [votacaoFinalizada, setVotacaoFinalizada] = useState(false);
	const [resultados, setResultados] = useState([]);
	const [avisoInicial, setAvisoInicial] = useState("");

	useEffect(() => {
		async function recuperarVotacao() {
			const votacaoAtual = await consultarVotacaoAtual();

			if (!votacaoAtual) {
				localStorage.removeItem(CHAVE_VOTANDO);
				return;
			}

			if (!localStorage.getItem(CHAVE_VOTANDO)) {
				setAvisoInicial(
					"Já existe uma votação em andamento em outro dispositivo. Aguarde a pessoa terminar e atualize a página.",
				);
				return;
			}

			setVotacao(votacaoAtual);
			setPagina("urna");
		}

		recuperarVotacao();
	}, []);

	return (
		<main>
			{pagina === "inicio" && (
				<Inicio
					avisoInicial={avisoInicial}
					onIniciarVotacao={(dados) => {
						localStorage.setItem(CHAVE_VOTANDO, "1");
						setVotacao(dados);
						setPagina("urna");
					}}
				/>
			)}

			{pagina === "urna" && (
				<Urna
					votacao={votacao}
					onAtualizarVotacao={setVotacao}
					onFinalizarVotacao={() => {
						localStorage.removeItem(CHAVE_VOTANDO);
						setVotacaoFinalizada(true);
					}}
					onApurarVotos={async () => {
						const dados = await buscarResultados();

						setResultados(dados);
						setPagina("resultados");
					}}
					onVoltarInicio={async () => {
						await cancelarVotacao();

						localStorage.removeItem(CHAVE_VOTANDO);
						setAvisoInicial("");

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
