"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const baseUrl = "https://api.wheniwork.com/2/";
// ******************************
// ****** CLASS WIW *********
// ******************************
class Wiw {
    // Constructor
    constructor(devKey, token) {
        this.devKey = devKey;
        this.token = token;
    }
    // Methods
    // private
    wiwGet(endpoint, qs, done) {
        const token = this.token;
        request_1.default.get(baseUrl + endpoint, {
            json: true,
            headers: {
                "W-Token": token
            },
            qs: qs
        }, function (error, response, html) {
            const body = html;
            if (error) {
                done(error);
            }
            if (body.error) {
                done(body.error);
            }
            body.token = token;
            done(undefined, body);
        });
    }
    // Methods
    // public
    //////////////////
    //  LOGIN
    //////////////////
    login(email, password, done) {
        const devKey = this.devKey;
        request_1.default.post(baseUrl + "login", {
            json: true,
            headers: {
                "W-Key": devKey
            },
            body: { username: email, password: password }
        }, function (error, response, html) {
            const body = html;
            if (error) {
                done(error);
            }
            if (body.error) {
                done(undefined, false, { message: body.error });
            }
            if (body.user) {
                done(undefined, body);
            }
        });
    }
    //////////////////
    // GET WIW INFO
    //////////////////
    getSchedule(options, done) {
        this.wiwGet("shifts/", options, (error, shifts) => {
            this.wiwGet("schedule/", options, (error, schedule) => {
                this.wiwGet("positions/", options, (error, positions) => {
                    shifts.requests = schedule.requests;
                    shifts.positions = positions.positions;
                    done(error, shifts);
                });
            });
        });
    }
    getUsers(done) {
        this.wiwGet("users/", undefined, done);
    }
    getUserById(id, done) {
        this.wiwGet("users/" + id, undefined, done);
    }
    ////////////////////
    // Get/Set DEV-KEY
    ////////////////////
    getDevKey() {
        return this.devKey;
    }
    setDevKey(key) {
        this.devKey = key;
    }
    ////////////////////
    // Get/Set TOKEN
    ////////////////////
    getToken() {
        return this.token;
    }
    setToken(token) {
        this.token = token;
    }
}
exports.Wiw = Wiw;
//# sourceMappingURL=Wiw.js.map