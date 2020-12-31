"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const passport_local_1 = __importDefault(require("passport-local"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserController = __importStar(require("./UserController"));
function init(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.username);
    });
    passport.deserializeUser((username, done) => {
        done(null, UserController.getUser(username));
    });
    passport.use("local-login", new passport_local_1.default.Strategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        try {
            let user = UserController.getUser(username);
            if (user === undefined) {
                done(null, false, req.flash("loginMessage", "No user found."));
            }
            if (await bcrypt_1.default.compare(password, user.password)) {
                return done(null, user);
            }
            else {
                return done(null, false, req.flash("loginMessage", "Oops! Wrong password."));
            }
        }
        catch (e) {
            return done(e);
        }
    }));
    passport.use("local-signup", new passport_local_1.default.Strategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
    }, async (req, username, password, done) => {
        try {
            console.log(`Sign-up POST req: ${JSON.stringify(req.body, null, 2)}`);
            let hash = await bcrypt_1.default.hash(req.body.password, 10);
            let user = {
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                email: req.body.email,
                userType: 0,
                name: req.body.name,
            };
            UserController.registerUser(user);
            return done(null, user);
        }
        catch (error) {
            return done(error, false, req.flash("signUpMessage", error));
        }
    }));
}
exports.init = init;
