"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
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
    // console.log(`User: ${JSON.stringify(req.user, null, 4)}`);
    res.render("information", { layout: "information-layout", user: req.user });
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
module.exports = router;
