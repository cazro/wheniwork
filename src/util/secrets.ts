import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}

export const ENVIRONMENT = process.env["RUN_MODE"];
export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const WIW_DEV_KEY = process.env["WIW_DEV_KEY"];
export const MONGODB_URI = process.env["MONGODB_URI"];
export const PORT = process.env["PORT"];

if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

if (!WIW_DEV_KEY) {
    logger.error("No When I Work API key. Set WIW_DEV_KEY environment variable.");
    process.exit(1);
}