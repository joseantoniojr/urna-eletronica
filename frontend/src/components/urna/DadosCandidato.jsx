export default function DadosCandidato({ numero, candidato }) {
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
					<dl>
						<dt>Nome:</dt>
						<dd>{candidato?.nomeUrna}</dd>
						<dt>Partido:</dt>
						<dd>{candidato?.partido}</dd>
					</dl>

					{(candidato?.cargo === "PRESIDENTE" || candidato?.cargo === "GOVERNADOR") && candidato?.vice && (
						<dl>
							<dt>Vice:</dt>
							<dd>{candidato?.vice.nomeUrna}</dd>
						</dl>
					)}

					{candidato?.cargo === "SENADOR" && candidato?.suplentes && (
						<dl>
							<dt>1º Suplente:</dt>
							<dd>{candidato?.suplentes[0]?.nomeUrna}</dd>
							<dt>2º Suplente</dt>
							<dd>{candidato?.suplentes[1]?.nomeUrna}</dd>
						</dl>
					)}
				</div>
				<figure>
					{/* <img src='https://api.dicebear.com/10.x/personas/svg' alt='avatar' /> */}
					<figcaption>{candidato?.cargo}</figcaption>
				</figure>
			</div>
		</section>
	);
}
