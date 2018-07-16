import passport from "passport";
import { IVerifyOptions } from "passport-local";
import { Response, Request, NextFunction } from "express";
import { Wiw } from "../lib/classes/Wiw";
const request = require("express-validator");


/**
 * GET /getLogin
 * Log In Form.
 */
export let getLogin = (req: Request, res: Response, next: NextFunction) => {
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
export let postLogin = (req: Request, res: Response, next: NextFunction) => {
    req.assert("email", "Email is not valid").isEmail();
    req.assert("password", "Password cannot be blank").notEmpty();
    req.sanitize("email").normalizeEmail({gmail_remove_dots: false});

    const errors = req.validationErrors();

    if (errors) {
        console.error(errors);
        req.flash("errors", "There are errors with the form");
        return res.redirect("/");
    }

    passport.authenticate("local", {
            failureRedirect: "/login"
        },
        (err: Error, user: Wiw.LoginResponseObjectType, info: IVerifyOptions) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash("errors", info.message);
            return res.redirect("/login");
        }

        req.logIn(user, (err) => {
            if (err) { return next(err); }
            req.flash("success", "Success! You are logged in.");
            res.redirect("/");
        });
    })(req, res, next);
};


export let getAccount = (req: Request, res: Response) => {
    if (!req.user) { return res.redirect("/"); }

    return res.render("account/profile");
};
/**
 * GET /logout
 * Log out.
 */
export let logout = (req: Request, res: Response) => {
    req.logout();
    req.flash("info", "You have logged out.");
    res.redirect("/");
};