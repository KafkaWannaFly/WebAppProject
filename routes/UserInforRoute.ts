import express from "express";
import { readFile } from "fs";
import passport from "passport";
import { User } from "../resources/js/Models/user";
const router = express.Router();

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
		let user = req.user as User;
		// If admin login
		if (user.userType == 1) {
			readFile(
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
		}

		// console.log(`User: ${JSON.stringify(req.user, null, 4)}`);
		res.render("information", { layout: "information-layout", user: req.user });
	}
);

router.get("/json", (req, res) => {
	// console.log(`user: ${JSON.stringify(req.user, null, 4)}`);
	if (req.isAuthenticated()) {
		res.send(JSON.stringify(req.user));
	} else {
		res.send(JSON.stringify(undefined));
	}
});

module.exports = router;
