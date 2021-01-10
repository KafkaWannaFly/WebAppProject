const express = require("express");
const router = express.Router();

var controller = require("../controllers/ListProductController");
const { getAllItemsAsync } = require("../controllers/ItemController");

router.get("/", (req, res) => {
	let category = req.query["category"];

	controller.getProduct(category).then((data) => {
		res.render("list-product", {
			layout: "list-product-layout",
			ListProduct: data,
		});
	});
});

router.get("/json", async (req, res) => {
	let category = req.query.category;
	console.log(category);
	// Send all if don't define category
	if (category === undefined) {
		let items = await getAllItemsAsync();
		res.send(JSON.stringify(items));
	} else {
		let items = await controller.getProduct(category);
		res.send(JSON.stringify(items));
	}
});

module.exports = router;
