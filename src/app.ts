import express from "express";
import { SESSION_SECRET, ENVIRONMENT, PORT } from "./util/secrets";
import compression from "compression";  // compresses requests
import session from "express-session";
import MemoryStore from "memorystore";
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";
import passport from "passport";
import expressValidator from "express-validator";

 // Controllers (route handlers)
import * as userController from "./controllers/user";
import * as homeController from "./controllers/home";
import * as wiwController from "./controllers/wiw";

 // API keys and Passport configuration
import * as passportConfig from "./config/passport";

 // Create Express server
const app = express();
const memStore = MemoryStore(session);

 // Express configuration
app.set("port", PORT || 3000);
app.set("env", ENVIRONMENT);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new memStore({
        checkPeriod: 86400000
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/", homeController.getHome);
app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
app.get("/login", userController.getLogin);
app.post("/login", userController.postLogin);
app.get("/logout", userController.logout);

app.get("/wiw/shifts", passportConfig.isAuthenticated, wiwController.getSchedule);


export default app;