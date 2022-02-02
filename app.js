const express = require("express");
const products = require("./db/products");
const app = express();
const { randomUUID } = require("crypto");
const fs = require("fs");

app.use(express.json());
port = 3001;

/*Formas de passar os dados::
 *Body => Sempre que eu quiser enviar dados para minha aplicação
 *Params => /product/482482
 *Query=> /product?id=9429492
 */

app.get("/", (req, res) => {
	console.log(products);
	return res.json({
		message: "Hello World",
	});
});

app.post("/products", (req, res) => {
	const { name, price } = req.body;

	const product = {
		name,
		price,
		id: randomUUID(),
	};
	products.push(product);

	fs.writeFile("product.json", JSON.stringify(product), (err) => {
		if (err) console.log(err);
		else console.log("Produto inserido");
	});

	return res.json(product);
});

app.get("/products", (req, res) => {
	return res.json(products);
});

app.get("/products/:id", (req, res) => {
	const { id } = req.params;
	const productId = products.find((product) => product.id === id);
	console.log(productId);
	return res.json(productId);
});

app.put("/products/:id", (req, res) => {
	const { id } = req.params;
	const { name, price } = req.body;

	const productIndex = products.findIndex((product) => product.id === id);

	const body = (products[productIndex] = {
		...products[productIndex],
		name,
		price,
	});
	return res.json(body);
});

app.delete("/products/:id", (req, res) => {
	const { id } = req.params;

	const productIndex = products.findIndex((product) => product.id === id);

	products.splice(productIndex, 1);

	res.json("Produto removido com sucesso!");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
