import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../controllers/Models";
import { updateUserAsync } from "../controllers/UserController";
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
		// console.log(`user: ${JSON.stringify(req.user, null, 4)}`);

		// If admin login
		if (user.userType == 1) {
			console.log(`Redirect to admin`);
			res.redirect(
				`/admin/dashboard?user=${encodeURIComponent(JSON.stringify(user))}`
			);
			return;
		}

		let failMsg = req.query.failMsg;
		let warnMsg = "";
		if (failMsg === "wrong-pwd") {
			warnMsg = "Mật khẩu cũ không đúng!";
		}
		// console.log(`User: ${JSON.stringify(req.user, null, 4)}`);
		res.render("information", {
			layout: "information-layout",
			Data: { User: user, Warning: warnMsg },
		});
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
		console.log(`req.body: ${JSON.stringify(req.body, null, 4)}`);

		let name = req.body["name"];
		let email = req.body["email"];
		let phone = req.body["phone"];
		let address = req.body["address"];
		let dob = req.body["dob"];
		let gender = req.body["sex"];
		let height = req.body["height"];
		let weight = req.body["weight"];

		let oldPass = (req.body["old-pwd"] as string).trim();
		let newPass = (req.body["new-pwd"] as string).trim();

		let user = req.user as User;

		if (oldPass !== "") {
			let hash = await bcrypt.hash(oldPass, 10);
			if (user.password !== hash) {
				res.redirect("/infor?failMsg=wrong-pwd");
			}

			if (newPass !== "") {
				hash = await bcrypt.hash(newPass, 10);
				user.password = hash;
			}
		}

		user = {
			name: name,
			email: email,
			phone: phone,
			address: address,
			DoB: dob,
			gender: gender == "male" ? true : false,
			height: height,
			weight: weight,

			password: user.password,
			userType: user.userType,
			username: user.username,
		};

		await updateUserAsync(user.username, user);
		console.log(`Update user: ${JSON.stringify(user, null, 4)}`);

		res.redirect("back");
	}
);

module.exports = router;
