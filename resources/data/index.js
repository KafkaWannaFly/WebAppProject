const fs = require("fs");
fs.readFile("./resources/data/products.json", "utf8", (err, jsonString) => {
	if (err) {
		console.log("File read failed:", err);
		return;
	}
	try {
		const products = JSON.parse(jsonString);
		module.exports = products;
	} catch (err) {
		console.log("Error parsing JSON string:", err);
	}
});
