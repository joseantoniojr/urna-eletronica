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
					<li key={etapa} className={index === indexAtual ? "urna__etapa urna__etapa--atual" : "urna__etapa"}>
						{etapa}
					</li>
				))}
			</ol>
		</header>
	);
}
