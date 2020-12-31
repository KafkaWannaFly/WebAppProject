"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.getUser = void 0;
const fs_1 = __importDefault(require("fs"));
let users = JSON.parse(fs_1.default.readFileSync("./data/users.json", {
    encoding: "utf-8",
}));
function getUser(username) {
    let user = users.find((val, idx) => {
        if (val.username === username) {
            return true;
        }
        return false;
    });
    return user;
}
exports.getUser = getUser;
function registerUser(user) {
    if (getUser(user.username) !== undefined) {
        throw "Existing username";
    }
    users.push(user);
    fs_1.default.writeFile("./data/users.json", JSON.stringify(users, null, 2), () => {
        console.log(`Done saving: ${JSON.stringify(users, null, 2)}`);
    });
}
exports.registerUser = registerUser;
