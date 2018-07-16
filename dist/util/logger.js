"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_2 = require("winston");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const logger = new (winston_2.Logger)({
    transports: [
        new (winston_1.default.transports.Console)({ level: process.env.LOG_LEVEL }),
        new (winston_1.default.transports.File)({ filename: "debug.log", level: "debug" })
    ]
});
if (process.env.LOG_LEVEL !== "error") {
    logger.debug("Logging initialized at debug level");
}
exports.default = logger;
//# sourceMappingURL=logger.js.map