import "../styles/resultados.css";

export default function Resultados({ resultados }) {
	const resultadoPresidente = resultados.find((resultado) => resultado.cargo === "PRESIDENTE");

	const resultadosPorEstado = resultados
		.filter((resultado) => resultado.cargo !== "PRESIDENTE")
		.reduce((estados, resultado) => {
			if (!estados[resultado.uf]) {
				estados[resultado.uf] = [];
			}

			estados[resultado.uf].push(resultado);

			return estados;
		}, {});

	function renderResultadoCargo(resultado) {
		const candidatos = resultado.candidatos
			.filter((candidato) => candidato.votos > 0)
			.sort((a, b) => b.votos - a.votos);

		const totalVotos =
			candidatos.reduce((total, candidato) => total + candidato.votos, 0) + resultado.brancos + resultado.nulos;

		return (
			<article className='resultados__cargo' key={`${resultado.uf}-${resultado.cargo}`}>
				<header className='resultados__cargo-cabecalho'>
					<div>
						<span>Apuração</span>
						<h2>{resultado.cargo}</h2>
					</div>

					<strong>{resultado.uf}</strong>
				</header>

				<div className='resultados__tabela'>
					<div className='resultados__tabela-cabecalho'>
						<span>POS.</span>
						<span>CANDIDATO</span>
						<span>PARTIDO</span>
						<span>VOTOS</span>
						<span>%</span>
					</div>

					{candidatos.map((candidato, index) => {
						const percentual = totalVotos > 0 ? (candidato.votos / totalVotos) * 100 : 0;

						return (
							<div className='resultados__linha' key={candidato.sqCandidato}>
								<strong>{index + 1}º</strong>

								<span>{candidato.nomeUrna}</span>

								<span>{candidato.partido}</span>

								<strong>{candidato.votos}</strong>

								<div className='resultados__percentual'>
									<div className='resultados__barra' style={{ width: `${percentual}%` }} />

									<span>{percentual.toFixed(2)}%</span>
								</div>
							</div>
						);
					})}
				</div>

				<footer className='resultados__resumo'>
					<span>
						TOTAL DE VOTOS: <strong>{totalVotos}</strong>
					</span>

					<span>
						BRANCOS: <strong>{resultado.brancos}</strong>
					</span>

					<span>
						NULOS: <strong>{resultado.nulos}</strong>
					</span>
				</footer>
			</article>
		);
	}

	return (
		<section className='resultados'>
			<header className='resultados__cabecalho'>
				<div>
					<span>ELEIÇÃO GERAL 2026</span>
					<h1>APURAÇÃO DE VOTOS</h1>
				</div>

				<strong>RESULTADO FINAL</strong>
			</header>

			{resultadoPresidente && (
				<section className='resultados__presidente'>
					<header className='resultados__estado-cabecalho'>
						<div>
							<span>APURAÇÃO NACIONAL</span>
							<h2>PRESIDENTE</h2>
						</div>

						<strong>BRASIL</strong>
					</header>

					{renderResultadoCargo(resultadoPresidente)}
				</section>
			)}

			{Object.entries(resultadosPorEstado).map(([uf, resultadosEstado]) => (
				<section className='resultados__estado' key={uf}>
					<header className='resultados__estado-cabecalho'>
						<div>
							<span>APURAÇÃO ESTADUAL</span>
							<h2>ESTADO</h2>
						</div>

						<strong>{uf}</strong>
					</header>

					{resultadosEstado.map((resultado) => renderResultadoCargo(resultado))}
				</section>
			))}
		</section>
	);
}
