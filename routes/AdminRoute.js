const fs = require("fs");
const express = require("express");

const { getAllItemsAsync } = require("../controllers/ItemController");
const { getAllBills } = require("../controllers/BillsControllers");

const router = express.Router();

router.get(
	"/dashboard",
	// (req, res, next) => {
	// 	// console.log(`user: ${JSON.stringify(req.user, null, 4)}`);

	// 	if (req.isAuthenticated()) {
	// 		next();
	// 	}

	// 	res.redirect("/login");
	// },
	(req, res) => {
		let user = req.user;
		console.log(`userrr: ${JSON.stringify(user, null, 4)}`);

		try {
			fs.readFile(
				"./pages/admin/admin-dasboard.htm",
				{ encoding: "utf-8" },
				(err, data) => {
					if (err) {
						res.send(err);
					} else {
						res.type("html");
						res.send(data);
					}
				}
			);
		} catch (err) {
			console.error(err);
		}
	}
);

router.get("/profile", (req, res) => {
	let user = req.user;
	// console.log(`user: ${JSON.stringify(req.user, null, 4)}`);

	res.render("admin-profile", {
		layout: "profile-layout",
		Data: {
			User: user,
		},
	});
});

router.get("/list-product", async (req, res) => {
	let items = await getAllItemsAsync();

	res.render("admin-list-product", { layout: "list-products-layout" });
});

router.get("/list-bill", async (req, res) => {
	let bills = await getAllBills();

	for (let i = 0; i < bills.length; i++) {
		let paymentMethodToString = "";
		if (bills[i].paymentMethod === 0) {
			paymentMethodToString = "COD";
		} else if (bills[i].paymentMethod === 1) {
			paymentMethodToString = "MoMo";
		} else if (bills[i].paymentMethod === 2) {
			paymentMethodToString = "VNPay";
		} else {
			paymentMethodToString = "ZaloPay";
		}

		bills[i].paymentMethodToString = paymentMethodToString;

		let shipStatus = "";
		if (bills[i].status === 0) {
			shipStatus = "Đang xử lý";
		} else if (bills[i].status === 1) {
			shipStatus = "Đang giao";
		} else {
			shipStatus = "Hoàn tất";
		}

		bills[i].shipStatus = shipStatus;
	}

	res.render("admin-list-bill", {
		layout: "list-bill-layout",
		Data: { Bills: bills },
	});
});

router.get("/list-comment", (req, res) => {
	res.render("admin-list-comment", { layout: "list-comment-layout" });
});

router.get("/list-account", (req, res) => {
	res.render("admin-list-account", { layout: "list-account-layout" });
});

router.get("/json/items", async (req, res) => {
	let items = await getAllItemsAsync();
	res.send(JSON.stringify(items));
});

module.exports = router;
