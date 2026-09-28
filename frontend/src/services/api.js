const API_URL = import.meta.env.VITE_API_URL;

async function apiGet(endpoint) {
	try {
		const resposta = await fetch(`${API_URL}${endpoint}`);

		if (!resposta.ok) {
			throw new Error(`Erro HTTP: ${resposta.status}`);
		}

		return await resposta.json();
	} catch (error) {
		console.error("Erro ao buscar: ", error);
		throw error;
	}
}

async function apiPost(endpoint) {
	try {
		const resposta = await fetch(`${API_URL}${endpoint}`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
		});

		if (!resposta.ok) {
			throw new Error(`Erro HTTP: ${resposta.status}`);
		}

		return await resposta.json();
	} catch (error) {
		console.error("Erro ao enviar: ", error);
		throw error;
	}
}

export { apiGet, apiPost };
