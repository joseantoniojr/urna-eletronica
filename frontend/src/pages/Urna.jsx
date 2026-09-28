export default function Urna({ votacao }) {
	return (
		<main>
			<h1>Urna Eletrônica</h1>
			<pre>{JSON.stringify(votacao)}</pre>
		</main>
	);
}
