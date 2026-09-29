import { tocarSom } from "../../services/sons.js";

export default function TecladoNumerico({
	numeros,
	adicionarNumero,
	corrigirNumero,
	confirmarVoto,
	setNumero,
	setVotoBranco,
	setCandidato,
}) {
	return (
		<section aria-label='Teclado da urna'>
			<div>
				{numeros.map((num) => (
					<button
						key={num}
						type='button'
						onClick={() => {
							tocarSom("tecla");
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
						setCandidato(null);
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
