const fs = require("fs");
const { getItemsByCategoryAsync } = require("./ItemController");

// let products = JSON.parse(
//   fs.readFileSync("./data/products.json", {
//     encoding: "utf8",
//   })
// );

var controller = {};

controller.getProduct = async (category) => {
	let listProductOfCategory = await getItemsByCategoryAsync(category);

	return new Promise((resolve) => {
		resolve(listProductOfCategory);
	});
};

module.exports = controller;
