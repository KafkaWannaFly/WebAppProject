import express from "express";
import passport from "passport";
const router = express.Router();

router.get(
	"/",
	(req, res, next) => {
		if (req.isAuthenticated()) {
			res.redirect("/infor");
			return;
		}
		next();
	},
	(req, res) => {
		res.render("login-view", {
			layout: "login-view-layout",
			loginMessage: req.flash("loginMessage"),
		});
	}
);

router.post(
	"/",
	passport.authenticate("local-login", {
		successRedirect: "/infor",
		failureRedirect: "/login",
		failureFlash: true,
	})
);

module.exports = router;
