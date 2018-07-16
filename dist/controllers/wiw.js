"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Wiw_1 = require("../lib/classes/Wiw");
const wiw = new Wiw_1.Wiw();
exports.getSchedule = (req, res, next) => {
    let start = req.params.start;
    if (!start)
        start = new Date();
    let end = req.params.end;
    if (!end)
        end = new Date(start.getFullYear(), start.getMonth() + 2, start.getDate(), 23, 59, 58);
    wiw.setToken(req.user.token);
    wiw.getSchedule({ start: start, end: end }, (err, returnObject) => {
        if (err) {
            req.flash("errors", err);
            return res.status(500).end();
        }
        if (returnObject) {
            return res.json(returnObject);
        }
    });
};
//# sourceMappingURL=wiw.js.map