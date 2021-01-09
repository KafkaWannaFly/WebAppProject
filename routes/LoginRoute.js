"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/", (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect("/infor");
        return;
    }
    next();
}, (req, res) => {
    res.render("login-view", {
        layout: "login-view-layout",
        loginMessage: req.flash("loginMessage"),
    });
});
router.post("/", passport_1.default.authenticate("local-login", {
    successRedirect: "/infor",
    failureRedirect: "/login",
    failureFlash: true,
}));
module.exports = router;
