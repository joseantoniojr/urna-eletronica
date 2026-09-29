import CabecalhoVotacao from "./CabecalhoVotacao.jsx";
import DadosCandidato from "./DadosCandidato.jsx";
import InstrucoesVoto from "./InstrucoesVoto.jsx";

export default function TelaVotacao({
	cargoAtual,
	numero,
	candidato,
	quantidadeDigitos,
	votoBranco,
	indexAtual,
	uf,
	votacaoFinalizada,
}) {
	const candidatoVisivel = numero.length === quantidadeDigitos ? candidato : null;

	return (
		<article className='urna__tela'>
			{votacaoFinalizada ? (
				<h1 className="urna__fim-votacao">FIM</h1>
			) : (
				<>
					<CabecalhoVotacao indexAtual={indexAtual} uf={uf} />
					<DadosCandidato
						numero={numero}
						cargoAtual={cargoAtual}
						candidato={candidato}
						quantidadeDigitos={quantidadeDigitos}
						votoBranco={votoBranco}
					/>
					{(votoBranco || candidatoVisivel || (numero.length === quantidadeDigitos && !candidatoVisivel)) && (
						<InstrucoesVoto />
					)}
				</>
			)}
		</article>
	);
}
