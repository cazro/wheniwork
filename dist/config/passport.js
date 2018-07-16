"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const secrets_1 = require("../util/secrets");
const Wiw_1 = require("../lib/classes/Wiw");
const LocalStrategy = passport_local_1.default.Strategy;
const wiw = new Wiw_1.Wiw(secrets_1.WIW_DEV_KEY);
passport_1.default.serializeUser((user, done) => {
    done(undefined, { token: user.login.token, id: user.user.id });
});
passport_1.default.deserializeUser((sessionObject, done) => {
    wiw.setToken(sessionObject.token);
    wiw.getUserById(sessionObject.id, done);
});
/**
 * Sign in using Email and Password.
 */
passport_1.default.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, (username, password, done) => {
    wiw.login(username, password, done);
}));
/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};
//# sourceMappingURL=passport.js.map