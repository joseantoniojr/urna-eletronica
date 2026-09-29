const sons = {
	tecla: new Audio("../../public/sounds/tecla.mp3"),
	confirma: new Audio("../../public/sounds/confirma.mp3"),
	fim: new Audio("../../public/sounds/fim.mp3"),
};

function tocarSom(tipo) {
	const som = sons[tipo];

	if (!som) return;

	som.currentTime = 0;
	som.play();
}

export { tocarSom };
