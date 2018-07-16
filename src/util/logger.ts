import winston from "winston";
import { Logger } from "winston";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });


const logger = new (Logger)({
    transports: [
        new (winston.transports.Console)({ level: process.env.LOG_LEVEL }),
        new (winston.transports.File)({ filename: "debug.log", level: "debug"})
    ]
});

if (process.env.LOG_LEVEL !== "error") {
    logger.debug("Logging initialized at debug level");
}

export default logger;