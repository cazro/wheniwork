"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Wiw_1 = require("../lib/classes/Wiw");
const wiw = new Wiw_1.Wiw();
/**
 * GET /
 * Home page.
 */
exports.getHome = (req, res) => {
    let location = undefined;
    if (req.isAuthenticated() && req.user) {
        wiw.setToken(req.user.token);
        // GETTING LOCATION ID
        if (req.query.location) {
            location = req.query.location;
        }
        else {
            location = req.user.user.locations[0];
        }
        //  START / END Times
        const now = new Date();
        let start = req.query.start;
        if (!start)
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let end = req.query.end;
        if (!end)
            end = new Date(start.getFullYear(), start.getMonth() + 2, start.getDate());
        // GETTING SHIFTS
        wiw.getSchedule({
            start: start,
            end: end,
            location_id: location
        }, (err, schedule) => {
            if (err)
                req.flash("errors", err);
            if (!schedule.end)
                schedule.end = end;
            if (!schedule.start)
                schedule.start = start;
            const daysCount = Math.floor((Date.parse(schedule.end) - Date.parse(schedule.start)) / 86400000);
            schedule.daysCount = daysCount;
            if (req.query.update) {
                res.render("partials/schedule/shifts", { schedule: schedule });
            }
            else {
                res.render("home", { title: "Schedule", schedule: schedule });
            }
        });
    }
    else {
        if (req.query.update) {
            res.redirect("/");
        }
        else {
            res.render("home", { title: "Login", schedule: undefined });
        }
    }
};
//# sourceMappingURL=home.js.map