import itemRouter from "express";
import fs from "fs";
const router = itemRouter.Router();

import * as ItemController from "../controllers/ItemController";

router.get("/", (req, res) => {
	let id = req.query["id"].toString();
	let item = ItemController.getItem(id);

	// Have no idea why we have to go back 1 level but it do the job
	for (let i = 0; i < item.imagePaths.length; i++) {
		item.imagePaths[i] = "../" + item.imagePaths[i];
	}

	res.render("item-detail", { layout: "item-detail-layout", Item: item });
});

module.exports = router;
