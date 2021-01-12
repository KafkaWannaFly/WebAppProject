const express = require("express");
const router = express.Router();
const passport = require("passport");

var controller = require("../controllers/OrderListController.js");

router.get(
	"/",
	(req, res, next) => {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.redirect("/login");
		}
	},
	(req, res) => {
		let user = req.user;
		// If admin login
		// if (user.userType == 1) {
		//   readFile(
		//     "./pages/admin/admin-dasboard.htm",
		//     { encoding: "utf-8" },
		//     (err, data) => {
		//       if (err) {
		//         res.send(err);
		//       } else {
		//         res.type("html");
		//         res.send(data);
		//       }
		//     }
		//   );
		// }

		controller.getOrderList(user).then((data) => {
			res.render("order-list", { layout: "order-list-layout", Bills: data });
		});
	}
);

module.exports = router;
