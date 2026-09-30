const sons = {
	tecla: new Audio("/sounds/tecla.mp3"),
	confirma: new Audio("/sounds/confirma.mp3"),
	fim: new Audio("/sounds/fim.mp3"),
};

function tocarSom(tipo) {
	const som = sons[tipo];

	if (!som) return;

	som.currentTime = 0;
	som.play().catch(() => {});
}

export { tocarSom };
