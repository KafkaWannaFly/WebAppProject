import express from "express";
import fs from "fs";
const router = express.Router();

import * as ShoppingCartController from "../controllers/ShoppingCartController";

router.get("/", (req, res) => {
	res.render("shop-cart", { layout: "shop-cart-layout" });
});

module.exports = router;
