import CabecalhoVotacao from "./CabecalhoVotacao.jsx";
import DadosCandidato from "./DadosCandidato.jsx";
import InstrucoesVoto from "./InstrucoesVoto.jsx";

export default function TelaVotacao({ cargoAtual, numero, candidato, quantidadeDigitos, votoBranco, indexAtual, uf }) {
	return (
		<article>
			<CabecalhoVotacao indexAtual={indexAtual} uf={uf} />
			<DadosCandidato
				numero={numero}
				cargoAtual={cargoAtual}
				candidato={candidato}
				quantidadeDigitos={quantidadeDigitos}
				votoBranco={votoBranco}
			/>
			<InstrucoesVoto />
		</article>
	);
}
