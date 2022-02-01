const express = require("express");
const products = require("./db/products");
const app = express();
const { randomUUID } = require("crypto");

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
	return res.json(product);
});

app.get("/getProducts", (req, res) => {
	res.json({
		data: products,
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
