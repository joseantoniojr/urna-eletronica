import buscarUFs from "../services/ufs.service.js";

function listarUFs(req, res) {
	const ufs = buscarUFs();
	res.json(ufs);
}

export default listarUFs;
