import { useState } from "react";

import Inicio from "./pages/Inicio.jsx";
import Urna from "./pages/Urna.jsx";
import { cancelarVotacao } from "./services/eleicao.js";

function App() {
	const [votacao, setVotacao] = useState(null);
	const [pagina, setPagina] = useState("inicio");
	const [votacaoFinalizada, setVotacaoFinalizada] = useState(false);

	return (
		<main>
			{votacaoFinalizada ? (
				<h1>FIM</h1>
			) : (
				<>
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
						/>
					)}
				</>
			)}
		</main>
	);
}

export default App;
