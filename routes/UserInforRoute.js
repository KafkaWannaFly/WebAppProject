"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = require("fs");
const UserController_1 = require("../controllers/UserController");
const router = express_1.default.Router();
router.get("/", (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect("/login");
    }
}, (req, res) => {
    let user = req.user;
    // If admin login
    if (user.userType == 1) {
        fs_1.readFile("./pages/admin/admin-dasboard.htm", { encoding: "utf-8" }, (err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                res.type("html");
                res.send(data);
            }
        });
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
});
router.get("/json", (req, res) => {
    // console.log(`user: ${JSON.stringify(req.user, null, 4)}`);
    if (req.isAuthenticated()) {
        res.send(JSON.stringify(req.user));
    }
    else {
        res.send(JSON.stringify(undefined));
    }
});
router.post("/", (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect("/login");
    }
}, async (req, res) => {
    console.log(`req.body: ${JSON.stringify(req.body, null, 4)}`);
    let name = req.body["name"];
    let email = req.body["email"];
    let phone = req.body["phone"];
    let address = req.body["address"];
    let dob = req.body["dob"];
    let gender = req.body["sex"];
    let height = req.body["height"];
    let weight = req.body["weight"];
    let oldPass = req.body["old-pwd"].trim();
    let newPass = req.body["new-pwd"].trim();
    let user = req.user;
    if (oldPass !== "") {
        let hash = await bcrypt_1.default.hash(oldPass, 10);
        if (user.password !== hash) {
            res.redirect("/infor?failMsg=wrong-pwd");
        }
        if (newPass !== "") {
            hash = await bcrypt_1.default.hash(newPass, 10);
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
    await UserController_1.updateUserAsync(user.username, user);
    console.log(`Update user: ${JSON.stringify(user, null, 4)}`);
    res.redirect("back");
});
module.exports = router;
