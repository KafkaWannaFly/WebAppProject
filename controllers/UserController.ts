import fs from "fs";
import { User } from "../resources/js/Models/user";
import { UserModel } from "./Models";

// let users = JSON.parse(
// 	fs.readFileSync("./data/users.json", {
// 		encoding: "utf-8",
// 	})
// ) as User[];

// function getUser(username: string) {
// 	let user = users.find((val, idx) => {
// 		if (val.username === username) {
// 			return true;
// 		}
// 		return false;
// 	});

// 	return user;
// }

/**
 * If username is found, return User object.
 *
 * Else, return undefined
 * @param username Username
 * @returns a promise of User :)))
 */
async function getUserAsync(username: string): Promise<User> {
	try {
		let userDoc = await UserModel.findOne({ username: username }).exec();
		return userDoc.toObject() as User;
	} catch (err) {
		console.warn(`Fail getUserAsync. ${err}`);
	}
}

// function registerUser(user: User) {
// 	if (getUser(user.username) !== undefined) {
// 		return false;
// 	}

// 	users.push(user);
// 	fs.writeFile("./data/users.json", JSON.stringify(users, null, 4), () => {
// 		// console.log(`Done saving: ${JSON.stringify(users, null, 4)}`);
// 		return true;
// 	});
// }

/**
 * True if register successfully
 *
 * False if username has already existed
 *
 * Else, return undefined
 * @param user User to be save
 * @returns
 */
async function registerUserAsync(user: User): Promise<boolean> {
	try {
		let existedUser = await getUserAsync(user.username);
		if (existedUser !== undefined) {
			return false;
		}

		let userModel = new UserModel(user);
		await userModel.save();

		return true;
	} catch (err) {
		console.warn(`Fail registerUserAsync. ${err}`);
	}
}

export { getUserAsync, registerUserAsync };
