const http = require("http");

http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });

	if (req.url === "/produto") {
		res.end("Rota de produto");
	}

	if (req.url === "/usuario") {
		res.end(
			JSON.stringify({
				message: "Rota de usuario",
			})
		);
	}
	res.end(
		JSON.stringify({
			message: "Qualquer coisa",
		})
	);
}).listen(3000, () => {
	console.log("Server is running");
});
