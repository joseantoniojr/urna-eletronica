export default function CabecalhoVotacao({ cargoAtual }) {
	return (
		<header>
			<ol>
				<li>Deputado Federal</li>
				<li>Deputado Estadual</li>
				<li>Senador - 1ª vaga</li>
				<li>Senador - 2ª vaga</li>
				<li>Governador</li>
				<li>Presidente</li>
			</ol>

			<p>Seu voto para</p>
			<h2>{cargoAtual}</h2>
		</header>
	);
}
