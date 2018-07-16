import { Response, Request, NextFunction } from "express";
import { Wiw } from "../lib/classes/Wiw";

const wiw = new Wiw();

export let getSchedule = (req: Request, res: Response, next: NextFunction) => {
    let start = req.params.start;
    if (!start) start = new Date();

    let end = req.params.end;
    if (!end) end = new Date(start.getFullYear(), start.getMonth() + 2, start.getDate(), 23, 59, 58);
    
    wiw.setToken(req.user.token);
    
    wiw.getSchedule({start: start, end: end}, (err: string, returnObject) => {
        if (err) {
            req.flash("errors", err);
            return res.status(500).end();
        }

        if (returnObject) {
            return res.json(returnObject);
        }
    });
};





