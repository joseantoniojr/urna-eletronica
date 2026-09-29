import CabecalhoVotacao from "./CabecalhoVotacao.jsx";
import DadosCandidato from "./DadosCandidato.jsx";
import InstrucoesVoto from "./InstrucoesVoto.jsx";

export default function TelaVotacao({ cargoAtual, numero, candidato }) {
	return (
		<article>
			<CabecalhoVotacao cargoAtual={cargoAtual} />
			<DadosCandidato numero={numero} cargoAtual={cargoAtual} candidato={candidato} />
			<InstrucoesVoto />
		</article>
	);
}
