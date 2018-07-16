"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const secrets_1 = require("./util/secrets");
const compression_1 = __importDefault(require("compression")); // compresses requests
const express_session_1 = __importDefault(require("express-session"));
const memorystore_1 = __importDefault(require("memorystore"));
const body_parser_1 = __importDefault(require("body-parser"));
const lusca_1 = __importDefault(require("lusca"));
const express_flash_messages_1 = __importDefault(require("express-flash-messages"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const express_validator_1 = __importDefault(require("express-validator"));
// Controllers (route handlers)
const userController = __importStar(require("./controllers/user"));
const homeController = __importStar(require("./controllers/home"));
const wiwController = __importStar(require("./controllers/wiw"));
// API keys and Passport configuration
const passportConfig = __importStar(require("./config/passport"));
// Create Express server
const app = express_1.default();
const memStore = memorystore_1.default(express_session_1.default);
// Express configuration
app.set("port", secrets_1.PORT || 3000);
app.set("env", secrets_1.ENVIRONMENT);
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_validator_1.default());
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: secrets_1.SESSION_SECRET,
    store: new memStore({
        checkPeriod: 86400000
    })
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_flash_messages_1.default());
app.use(lusca_1.default.xframe("SAMEORIGIN"));
app.use(lusca_1.default.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use(express_1.default.static(path_1.default.join(__dirname, "public"), { maxAge: 31557600000 }));
/**
 * Primary app routes.
 */
app.get("/", homeController.getHome);
app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
app.get("/login", userController.getLogin);
app.post("/login", userController.postLogin);
app.get("/logout", userController.logout);
app.get("/wiw/shifts", passportConfig.isAuthenticated, wiwController.getSchedule);
exports.default = app;
//# sourceMappingURL=app.js.map