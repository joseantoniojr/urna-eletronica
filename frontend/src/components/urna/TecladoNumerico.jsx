export default function TecladoNumerico({
	numeros,
	adicionarNumero,
	corrigirNumero,
	confirmarVoto,
	setNumero,
	setVotoBranco,
}) {
	return (
		<section aria-label='Teclado da urna'>
			<div>
				{numeros.map((num) => (
					<button
						key={num}
						type='button'
						onClick={() => {
							adicionarNumero(num);
						}}
					>
						{num}
					</button>
				))}
			</div>

			<div>
				<button
					type='button'
					onClick={() => {
						setNumero("");
						setVotoBranco(true);
					}}
				>
					BRANCO
				</button>

				<button type='button' onClick={corrigirNumero}>
					CORRIGE
				</button>

				<button type='button' onClick={confirmarVoto}>
					CONFIRMA
				</button>
			</div>
		</section>
	);
}
