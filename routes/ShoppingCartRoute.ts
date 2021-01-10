import express from "express";
import fs from "fs";
const router = express.Router();

import { Bill } from "../resources/js/Models/bill";
import { User } from "../resources/js/Models/user";
import * as UserController from "../controllers/UserController";
import * as BillController from "../controllers/BillsControllers";

router.get("/", (req, res) => {
	res.render("shop-cart", { layout: "shop-cart-layout" });
});

router.post(
	"/",
	(req, res, next) => {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.redirect("/login");
		}
	},
	async (req, res) => {
		let user = (req.user as unknown) as User;
		let bill = (req.body as unknown) as Bill;

		bill.status = 0;

		user.purchasedItems.push(bill.id);

		await UserController.updateUserAsync(user.username, user);
		await BillController.saveBillAsync(bill);

		// console.log(`Shopping cart, bill: ${JSON.stringify(bill, null, 4)}`);

		res.redirect("/infor");
	}
);

module.exports = router;
