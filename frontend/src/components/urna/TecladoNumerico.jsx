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
		<section className='urna__teclado' aria-label='Teclado da urna'>
			<div className='urna__teclas'>
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

			<div className='urna__acoes'>
				<button
					type='button'
					className='urna__acao urna__acao--branco'
					onClick={() => {
						setNumero("");
						setCandidato(null);
						setVotoBranco(true);
					}}
				>
					BRANCO
				</button>

				<button type='button' className='urna__acao urna__acao--corrige' onClick={corrigirNumero}>
					CORRIGE
				</button>

				<button type='button' className='urna__acao urna__acao--confirma' onClick={confirmarVoto}>
					CONFIRMA
				</button>
			</div>
		</section>
	);
}
