const fs = require("fs");
const { getTopSaleItemsAsync } = require("./ItemController");

// let products = JSON.parse(
//   fs.readFileSync("./data/products.json", {
//     encoding: "utf8",
//   })
// );

var controller = {};

controller.getTopProduct = async () => {
	// var productsArray = [];

	// for (category in products)
	//   productsArray = productsArray.concat(products[category]);

	//Sort Top Sellers
	// productsArray.sort((a, b) => {
	//   return b.sales - a.sales;
	// });

	let productsArray = await getTopSaleItemsAsync(12);

	let topProduct = [];

	for (let i = 0; i < 3; i++) {
		let row = [];
		for (let j = 0; j < 4; j++) {
			row.push(productsArray[i * 4 + j]);
		}
		topProduct.push(row);
	}
	return topProduct;
};

module.exports = controller;
