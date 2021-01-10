import express from "express";
import passport from "passport";
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
