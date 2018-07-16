"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const request = require("express-validator");
/**
 * GET /getLogin
 * Log In Form.
 */
exports.getLogin = (req, res, next) => {
    if (req.user) {
        return res.redirect("/");
    }
    res.render("account/login", {
        title: "Login"
    });
};
/**
 * POST /postLogin
 * Log In Post.
 */
exports.postLogin = (req, res, next) => {
    req.assert("email", "Email is not valid").isEmail();
    req.assert("password", "Password cannot be blank").notEmpty();
    req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
    const errors = req.validationErrors();
    if (errors) {
        console.error(errors);
        req.flash("errors", "There are errors with the form");
        return res.redirect("/");
    }
    passport_1.default.authenticate("local", {
        failureRedirect: "/login"
    }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash("errors", info.message);
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Success! You are logged in.");
            res.redirect("/");
        });
    })(req, res, next);
};
exports.getAccount = (req, res) => {
    if (!req.user) {
        return res.redirect("/");
    }
    return res.render("account/profile");
};
/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
    req.logout();
    req.flash("info", "You have logged out.");
    res.redirect("/");
};
//# sourceMappingURL=user.js.map