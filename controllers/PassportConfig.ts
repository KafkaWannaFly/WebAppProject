import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import * as UserController from "./UserController";

import _passport from "passport";
import { User } from "../resources/js/Models/user";

function init(passport: typeof _passport) {
	passport.serializeUser((user: User, done) => {
		done(null, user.username);
	});

	passport.deserializeUser(async (username: string, done) => {
		let user = await UserController.getUserAsync(username);
		done(null, user);
	});

	passport.use(
		"local-login",
		new passportLocal.Strategy(
			{
				usernameField: "username",
				passwordField: "password",
				passReqToCallback: true,
			},
			async (req, username, password, done) => {
				try {
					let user = await UserController.getUserAsync(username);
					if (user === undefined) {
						done(null, false, req.flash("loginMessage", "No user found."));
					}

					if (await bcrypt.compare(password, user.password)) {
						// console.log(`Login success: ${user}`);
						return done(
							null,
							user,
							req.flash("loginMessage", `Login success: ${user}`)
						);
					} else {
						return done(
							null,
							false,
							req.flash("loginMessage", "Oops! Wrong password.")
						);
					}
				} catch (e) {
					return done(null, false, req.flash("loginMessage", e));
				}
			}
		)
	);

	passport.use(
		"local-signup",
		new passportLocal.Strategy(
			{
				usernameField: "username",
				passwordField: "password",
				passReqToCallback: true,
			},
			async (req, username, password, done) => {
				let hash = await bcrypt.hash(req.body.password, 10);
				let user: User = {
					username: req.body.username,
					password: hash,
					phone: req.body.phone,
					email: req.body.email,
					userType: 0,
					name: req.body.name,
				};

				if (await UserController.registerUserAsync(user)) {
					return done(null, user);
				} else {
					return done(
						null,
						false,
						req.flash("signUpMessage", "User has already existed")
					);
				}
			}
		)
	);
}

export { init };
