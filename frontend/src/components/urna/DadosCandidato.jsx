export default function DadosCandidato({ numero, candidato, quantidadeDigitos, votoBranco, cargoAtual }) {
	const candidatoVisivel = numero.length === quantidadeDigitos ? candidato : null;

	return (
		<section className='urna__candidato'>
			<div className='urna__candidato-dados'>
				<header>
					<p className='urna__voto-titulo'>Seu voto para</p>
					<h2 className='urna__cargo-atual'>{cargoAtual}</h2>
				</header>

				{!votoBranco && (
					<div className='urna__candidato-info-numero'>
						<span className='urna__label'>Numero:</span>
						<div>
							<output className='urna__numeros-voto'>
								{Array.from({ length: quantidadeDigitos }).map((_, index) => (
									<span key={index}>{numero[index] ?? ""}</span>
								))}
							</output>
						</div>
					</div>
				)}

				{votoBranco && <p className='urna__voto-branco'>VOTO EM BRANCO</p>}

				{numero.length === quantidadeDigitos && !candidatoVisivel && (
					<p className='urna__voto-nulo'>VOTO NULO</p>
				)}

				{candidato && (
					<dl className='urna__dados-principais'>
						<div className='urna__dado-group'>
							<dt className='urna__label'>Nome:</dt>
							<dd>{candidatoVisivel?.nomeUrna}</dd>
						</div>
						<div className='urna__dado-group'>
							<dt className='urna__label'>Partido:</dt>
							<dd>{candidatoVisivel?.partido}</dd>
						</div>
					</dl>
				)}

				{(candidatoVisivel?.cargo === "PRESIDENTE" || candidatoVisivel?.cargo === "GOVERNADOR") &&
					candidatoVisivel?.vice && (
						<dl className='urna__dados-especiais'>
							<div className='urna__dado-group'>
								<dt className='urna__label'>Vice:</dt>
								<dd>{candidatoVisivel?.vice.nomeUrna}</dd>
							</div>
						</dl>
					)}

				{candidatoVisivel?.cargo === "SENADOR" && candidatoVisivel?.suplentes && (
					<dl className='urna__dados-especiais'>
						<div className='urna__dado-group'>
							<dt className='urna__label'>1º Suplente:</dt>
							<dd>{candidatoVisivel?.suplentes[0]?.nomeUrna}</dd>
						</div>
						<div className='urna__dado-group'>
							<dt className='urna__label'>2º Suplente</dt>
							<dd>{candidatoVisivel?.suplentes[1]?.nomeUrna}</dd>
						</div>
					</dl>
				)}
			</div>
			<figure className='urna__foto'>
				{candidatoVisivel && (
					<img
						src={`https://api.dicebear.com/10.x/personas/svg?seed=${candidatoVisivel.sqCandidato}`}
						alt='Avatar do candidato'
					/>
				)}
				<figcaption className='urna__foto-legenda'>{candidatoVisivel?.cargo}</figcaption>
			</figure>
		</section>
	);
}
