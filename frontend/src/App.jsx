import { useState } from "react";

import Inicio from "./pages/Inicio.jsx";
import Urna from "./pages/Urna.jsx";

function App() {
	const [votacao, setVotacao] = useState(null);
	const [pagina, setPagina] = useState("inicio");

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
			{pagina === "urna" && <Urna votacao={votacao} />}
		</main>
	);
}

export default App;
