import fs from "fs";
import { User } from "../resources/js/Models/user";
import { UserModel } from "./Models";

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

/**
 * Get all users in database
 * @returns
 */
async function getAllUsers() {
	try {
		let userDocs = await UserModel.find({}).lean().exec();
		let users: User[] = userDocs.map((val, idx) => {
			return (val as unknown) as User;
		});

		return users;
	} catch (err) {
		console.log(`Fail to getAllUsers. ${err}`);
	}
}

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

async function updateUserAsync(username: string, newValue: User) {
	try {
		let updatedUserDoc = await UserModel.findOneAndUpdate(
			{ username: username },
			newValue,
			{ new: true, useFindAndModify: false }
		);

		return (updatedUserDoc as unknown) as User;
	} catch (err) {
		console.log(`Fail to update user. ${err}`);
	}
}

export { getUserAsync, registerUserAsync, getAllUsers, updateUserAsync };
