import { NOMES_UF } from "../../constants/estados.js";

export default function IdentificacaoVotacao({ uf }) {
	return (
		<p className="urna__identificacao">
			Votando em {NOMES_UF[uf]} ({uf})
		</p>
	);
}
