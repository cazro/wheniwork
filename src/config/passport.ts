import passport from "passport";
import passportLocal from "passport-local";
import _ from "lodash";
import { WIW_DEV_KEY } from "../util/secrets";
import { Request, Response, NextFunction } from "express";
import { Wiw } from "../lib/classes/Wiw";

const LocalStrategy = passportLocal.Strategy;

const wiw = new Wiw(WIW_DEV_KEY);

type SessionObject = {
    token: string,
    id: number
};

passport.serializeUser<any, any>((user, done) => {
    done(undefined, {token: user.login.token, id: user.user.id});
});

passport.deserializeUser((sessionObject: SessionObject, done) => {
    wiw.setToken(sessionObject.token);
    wiw.getUserById(sessionObject.id, done);
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, (username, password, done) => {
        wiw.login(username, password, done);
    }
));

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

