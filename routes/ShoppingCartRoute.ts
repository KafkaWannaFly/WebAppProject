import express from "express";
import fs from "fs";
const router = express.Router();

import * as ShoppingCartController from "../controllers/ShoppingCartController";

router.get("/", (req, res) => {
	let bill = ShoppingCartController.getBill("0");
	console.log(bill);
	res.render("shopping-cart", { layout: "shopping-cart-layout", bill: bill });
});

module.exports = router;
