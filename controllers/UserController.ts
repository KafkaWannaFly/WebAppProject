import fs from "fs";
import { User } from "../resources/js/Models/user";

let users = JSON.parse(
	fs.readFileSync("./data/users.json", {
		encoding: "utf-8",
	})
) as User[];

function getUser(username: string) {
	let user = users.find((val, idx) => {
		if (val.username === username) {
			return true;
		}
		return false;
	});

	return user;
}

function registerUser(user: User) {
	if (getUser(user.username) !== undefined) {
		return false;
	}

	users.push(user);
	fs.writeFile("./data/users.json", JSON.stringify(users, null, 4), () => {
		// console.log(`Done saving: ${JSON.stringify(users, null, 4)}`);
		return true;
	});
}

export { getUser, registerUser };
