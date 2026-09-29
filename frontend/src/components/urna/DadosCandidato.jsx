export default function DadosCandidato({ numero, candidato, quantidadeDigitos, votoBranco }) {
	const candidatoVisivel = numero.length === quantidadeDigitos ? candidato : null;

	return (
		<section>
			<div>
				<div>
					<div>
						<span>Numero:</span>
						<div>
							<output>{numero}</output>
						</div>
					</div>

					{votoBranco && <p>VOTO EM BRANCO</p>}

					{numero.length === quantidadeDigitos && !candidatoVisivel && <p>VOTO NULO</p>}

					<dl>
						<dt>Nome:</dt>
						<dd>{candidatoVisivel?.nomeUrna}</dd>
						<dt>Partido:</dt>
						<dd>{candidatoVisivel?.partido}</dd>
					</dl>

					{(candidatoVisivel?.cargo === "PRESIDENTE" || candidatoVisivel?.cargo === "GOVERNADOR") &&
						candidatoVisivel?.vice && (
							<dl>
								<dt>Vice:</dt>
								<dd>{candidatoVisivel?.vice.nomeUrna}</dd>
							</dl>
						)}

					{candidatoVisivel?.cargo === "SENADOR" && candidatoVisivel?.suplentes && (
						<dl>
							<dt>1º Suplente:</dt>
							<dd>{candidatoVisivel?.suplentes[0]?.nomeUrna}</dd>
							<dt>2º Suplente</dt>
							<dd>{candidatoVisivel?.suplentes[1]?.nomeUrna}</dd>
						</dl>
					)}
				</div>
				<figure>
					{/* <img src='https://api.dicebear.com/10.x/personas/svg' alt='avatar' /> */}
					<figcaption>{candidatoVisivel?.cargo}</figcaption>
				</figure>
			</div>
		</section>
	);
}
