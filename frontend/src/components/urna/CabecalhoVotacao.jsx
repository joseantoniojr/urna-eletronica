export default function CabecalhoVotacao({ indexAtual, uf }) {
	const etapas = [
		"Deputado Federal",
		uf === "DF" ? "Deputado Distrital" : "Deputado Estadual",
		"Senador - 1ª vaga",
		"Senador - 2ª vaga",
		"Governador",
		"Presidente",
	];

	return (
		<header>
			<ol>
				{etapas.map((etapa, index) => (
					<li key={etapa}>{index === indexAtual ? `→ ${etapa}` : etapa}</li>
				))}
			</ol>

			<p>Seu voto para</p>
			<h2>{etapas[indexAtual]}</h2>
		</header>
	);
}
