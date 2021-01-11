import express from "express";
import fs from "fs";
const router = express.Router();

import * as ItemController from "../controllers/ItemController";

router.get("/", async (req, res) => {
	let id = req.query["id"].toString();
	let item = await ItemController.getItemAsync(id);

	// Have no idea why we have to go back 1 level but it do the job
	for (let i = 0; i < item.imagePaths.length; i++) {
		item.imagePaths[i] = "../" + item.imagePaths[i];
	}

	res.render("product-item", { layout: "product-item-layout", Item: item });
});

router.get("/rate", async (req, res) => {
	let id = req.query["id"].toString();
	res.redirect("/list-product/item?id=" + id + "#rate");
});

module.exports = router;
// export default router;
