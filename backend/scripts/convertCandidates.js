import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/consulta_cand_2026_BRASIL.csv");

const csv = fs.readFileSync(filePath, "latin1");

const records = parse(csv, {
	columns: true,
	delimiter: ";",
});