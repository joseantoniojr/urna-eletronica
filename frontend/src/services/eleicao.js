import { apiPost } from "./api.js";

async function iniciarVotacao(uf) {
	return await apiPost(`/eleicao/iniciar-votacao?uf=${uf}`);
}

export { iniciarVotacao };
