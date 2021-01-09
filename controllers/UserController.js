import fs from "fs";
let users = JSON.parse(fs.readFileSync("./data/users.json", {
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
function registerUser(user) {
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
