"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserAsync = exports.getAllUsers = exports.registerUserAsync = exports.getUserAsync = void 0;
const Models_1 = require("./Models");
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
/**
 * Get all users in database
 * @returns
 */
async function getAllUsers() {
    try {
        let userDocs = await Models_1.UserModel.find({}).lean().exec();
        let users = userDocs.map((val, idx) => {
            return val;
        });
        return users;
    }
    catch (err) {
        console.log(`Fail to getAllUsers. ${err}`);
    }
}
exports.getAllUsers = getAllUsers;
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
async function updateUserAsync(username, newValue) {
    try {
        let updatedUserDoc = await Models_1.UserModel.findOneAndUpdate({ username: username }, newValue, { new: true, useFindAndModify: false });
        return updatedUserDoc;
    }
    catch (err) {
        console.log(`Fail to update user. ${err}`);
    }
}
exports.updateUserAsync = updateUserAsync;
