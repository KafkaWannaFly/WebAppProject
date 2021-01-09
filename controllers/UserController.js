"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserAsync = exports.getUserAsync = void 0;
const Models_1 = require("./Models");
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
async function getUserAsync(username) {
    try {
        let userDoc = await Models_1.UserModel.findOne({ username: username }).exec();
        return userDoc.toObject();
    }
    catch (err) {
        console.warn(`Fail getUserAsync. ${err}`);
    }
}
exports.getUserAsync = getUserAsync;
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
async function registerUserAsync(user) {
    try {
        let existedUser = await getUserAsync(user.username);
        if (existedUser !== undefined) {
            return false;
        }
        let userModel = new Models_1.UserModel(user);
        await userModel.save();
        return true;
    }
    catch (err) {
        console.warn(`Fail registerUserAsync. ${err}`);
    }
}
exports.registerUserAsync = registerUserAsync;
