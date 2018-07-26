import request from "request";
import { IVerifyOptions } from "passport-local";

const baseUrl = "https://api.wheniwork.com/2/";


// ******************************
// ****** CLASS WIW *********
// ******************************

export class Wiw {
        
    // Fields
    private devKey: string;
    private token: string;

    // Constructor
    constructor(devKey?: string, token?: string) {
        this.devKey = devKey;
        this.token = token;
    }

    // Methods
    // public
    
    //////////////////
    //  LOGIN
    //////////////////
    public login(email: string, password: string, done: (err: string | Error, body?: Wiw.LoginResponseObjectType | boolean, info?: IVerifyOptions) => void): void {
        const devKey = this.devKey;
        request.post(baseUrl + "login",
        {
            json: true,
            headers: {
                "W-Key": devKey
            },
            body: { username: email, password: password }
        }, function(error, response, html) {

            const body = html;

            if (error) { done(error); }

            if (body.error) { done(undefined, false, {message: body.error}); }

            if (body.user) { done(undefined, body); }
        });
    }

    //////////////////
    // GET WIW INFO
    //////////////////
    
    public getSchedule(options: ScheduleOptions, done: (err: Error | string, data?: Wiw.ShiftsResponseObjectType | Wiw.PositionsResponseObjectType) => void): void {
        this.wiwGet("shifts/", options, (error, shifts) => {
            this.wiwGet("schedule/", options, (error, schedule) => {
                shifts.users = this.sortUsers(shifts.users);
                shifts.requests = schedule.requests;
                done(error, shifts);
            });
            
        });
    }

    public getUsers(done: (err: Error | string, data?: Wiw.UsersResponseObjectType | Wiw.PositionsResponseObjectType | boolean) => void): void {
        this.wiwGet("users/", undefined, done);
    }

    public getUserById(id: number, done: (err: Error | string, data?: Wiw.DeserializedUserObjectType | Wiw.ShiftsResponseObjectType | Wiw.PositionsResponseObjectType) => void): void {
        this.wiwGet("users/" + id, undefined, done);
    }
    
        
    ////////////////////
    // Get/Set DEV-KEY
    ////////////////////
    public getDevKey(): string {
        return this.devKey;
    }
    
    public setDevKey(key: string): void {
        this.devKey = key;
    }
    
    ////////////////////
    // Get/Set TOKEN
    ////////////////////
    public getToken(): string {
        return this.token;
    }
    
    public setToken(token: string): void {
        this.token = token;
    }
    
    // Methods
    // private
    private wiwGet(endpoint: string, qs: object, done: (err: Error | string, data?: Wiw.ShiftsResponseObjectType | Wiw.PositionsResponseObjectType) => void): void {
        const token = this.token;
        request.get(baseUrl + endpoint,
        {
            json: true,
            headers: {
                "W-Token": token
            },
            qs: qs
        }, function(error, response, html) {
            const body = html;

            if (error) {  done(error); }

            if (body && body.error) {  done(body.error); }

            if (!body) {
                done(response ? response.statusMessage : "ERROR");
            } else {
                 
                body.token = token;

                done(undefined, body);
            }
            
        });
    }
    
    private sortUsers(users: UserObjectType[]): UserObjectType[] {
        const sortedUsers: UserObjectType[] = [];
        for (const user of users) {
            const sortPos = user.sort[user.locations[0] + ""];
            sortedUsers[sortPos - 1] = user;
        }
        let count = 0;
        sortedUsers.forEach((item, index) => {
            if (!sortedUsers[count]) {
                sortedUsers.splice(count, 1);
            }
            count++;
        });
        console.log(sortedUsers);
        return sortedUsers;
    }
}


// ******************************
// ****** NAMESPACE WIW *********
// ******************************

export namespace Wiw {

    export type DeserializedUserObjectType = {
        user: UserObjectType,
        shifts: ShiftObjectType[],
        locations: LocationObjectType[],
        positions: PositionObjectType[],
        token: string
    };
    
    export type LoginResponseObjectType = {
        login: {
            id: number,
            name: string,
            first_name: string,
            last_name: string,
            email: string,
            phone_number: string,
            created_at: string,
            updated_at: string,
            avatar: {
                url: string,
                size: string
            },
            token: string
        },
        error: string,
        code: number,
        token: string,
        user: UserObjectType,
        account: AccountObjectType,
        users: UserObjectType[],
        accounts: AccountObjectType[],
    };

    export type PositionsResponseObjectType = {
        start: string,
        end: string,
        requests: RequestObjectType[],
        daysCount: number,
        users: UserObjectType[];
        positions: PositionObjectType[]
    };
    
    export type ShiftsResponseObjectType = {
        start: string,
        end: string,
        daysCount: number,
        requests: RequestObjectType[],
        shifts: ShiftObjectType[],
        users: UserObjectType[],
        locations: LocationObjectType[],
        positions: PositionObjectType[]
    };

    export type UsersResponseObjectType = {
        users: UserObjectType[],
        locations: LocationObjectType[],
        positions: PositionObjectType[]
    };

    export type UserResponseObjectType = {
        user: UserObjectType,
        shifts: ShiftObjectType[],
        locations: LocationObjectType[],
        positions: PositionObjectType[]
    };
}

// ******************************
// ****** INTERNAL TYPES *********
// ******************************

type AccountObjectType = {
    id: number,
    master_id: number,
    country_id: number,
    agent_id: number,
    type: number,
    logo: string,
    company: string,
    subdomain: string,
    enabled: boolean,
    plan_id: number,
    plan_expires: string,
    plan_units: number,
    plan_type: number,
    features: string[],
    wb_expires: boolean,
    plan_custom: number,
    previous_plan_id: number,
    previous_plan_units: number,
    previous_type: number,
    text_credits: number,
    timezone_id: number,
    place_id: number,
    place_confirmed: boolean,
    billing_type: number,
    tax_exemption: string,
    referral_code: string,
    ref_plan_id: number,
    ref_employees: number,
    notifications: {
        key: string,
        show: boolean
    }[],
    settings: {
        schedule: {
            enabled: boolean,
            split_shifts: number,
            preferred_hours: boolean,
            shift_acknowledgement: boolean,
            start_of_week: number,
            "24hour": number,
            sort_employees: number,
            is_visible: boolean,
            positions_only: boolean,
            open_scheduling: boolean,
            currency: string,
            breaks: {
                enabled: boolean,
                auto_deduct: boolean,
                rules: string[]
            }
        },
        timeoff: {
            enabled: boolean,
            manager_approval: boolean,
            supervisor_autoapprove: boolean,
            days_notice: number,
            is_public: boolean,
            max_hours_per_day: number
        },
        availability: {
            enabled: boolean,
            is_public: boolean
        },
        swaps: {
            enabled: boolean,
            manager_approval: boolean
        },
        conversations: {
            enabled: boolean
        },
        permissions: {
            text_credits: number
        },
        social: {
            enabled: boolean
        },
        privacy: {
            enabled: boolean
        },
        workchat: {
            enabled: boolean,
            last_enabled_date: string,
            toggled: boolean
        },
        clockin: {
            enabled: boolean,
            mobile: {
                enabled: boolean,
                strict: boolean,
                radius: number
            },
            work: {
                enabled: boolean
            },
            window: number
        },
        payroll: {
            enabled: boolean,
            timesheets: boolean,
            start_date: string,
            type: number,
            hours_max: number,
            hours_max_daily: number,
            hours_dot_daily: number,
            ot_multiplier: number,
            dbl_multiplier: number,
            work_day_start: string,
            adp_enabled: boolean,
            adp_viewable: boolean,
            is_onboarded: boolean,
            ot_alerts_clockin: boolean,
            ot_alerts_clockout: boolean,
            ot_alerts_within: 4,
            reveal_attendance: boolean
        },
        integrations: {
            square: boolean,
            revel: boolean
        }
    },
    attendance_alert_manager: number,
    attendance_alert_employee: number,
    industry_id: number,
    cancelreason_id: number,
    cancelreason_feedback: string,
    payroll_date: boolean,
    utm_source: string,
    utm_medium: string,
    utm_term: string,
    utm_content: string,
    utm_campaign: string,
    is_demo: boolean,
    trial_length: number,
    trial_created_at: string,
    organization_id: number,
    business_id: string,
    created_at: string,
    updated_at: string,
    converted_at: string,
    is_deactivated: number,
    deactivated_at: string,
    is_deleted: boolean,
    deleted_at: string,
    is_default_location_address: boolean,
    availability_migrated: number,
    time_format: number,
    master_plan_id: number,
    timezone_name: string,
    plan_texting: number,
    referral_id: number,
    bad_credit_card: boolean,
    split_shifts: number,
    payroll_overtime_multiplier: number,
    payroll_hours_max: number,
    uses_features: string[],
    required_features: string[],
    toggles: string[],
    employee_count: number,
    user_count: number,
    has_billing: boolean,
    limited_features: {
        shift_acknowledgement: boolean
    },
    group: string,
    ref_status: string,
    owner: {
        id: number,
        name: string,
        email: string
    },
    has_saml: boolean,
    place: PlaceObjectType
};


type ShiftObjectType = {
    id: number,
    account_id: number,
    user_id: number,
    location_id: number,
    position_id: number,
    site_id: number,
    start_time: string,
    end_time: string,
    break_time: number,
    color: string,
    notes: string,
    instances: number,
    published: boolean,
    published_date: string,
    notified_at: string,
    created_at: string,
    updated_at: string,
    acknowledged: number,
    acknowledged_at: string,
    creator_id: number,
    is_open: boolean,
    actionable: boolean,
    block_id: number
};


type PlaceObjectType = {
    id: number,
    business_name: string,
    address: string,
    street_name: string,
    street_number: string,
    locality: string,
    sub_locality: string,
    region: string,
    postal_code: string,
    country: string,
    latitude: number,
    longitude: number,
    place_type: string[],
    place_id: string,
    updated_at: string
};


type LocationObjectType = {
    id: number,
    account_id: number,
    is_default: number,
    name: string,
    sort: number,
    max_hours: number,
    address: string,
    latitude: number,
    longitude: number,
    place_id: number,
    place_confirmed: boolean,
    ip_address: string,
    created_at: string,
    updated_at: string,
    is_deleted: boolean,
    deleted_at: string,
    coordinates: number[],
    radius: number,
    place: PlaceObjectType
};

type PositionObjectType = {
    id: number,
    account_id: number,
    name: string,
    color: string,
    sort: number,
    created_at: string,
    updated_at: string,
    updated_by: number,
    is_deleted: boolean
};

type RequestObjectType = {
    id: number,
    account_id: number,
    user_id: number,
    creator_id: number,
    updater_id: number,
    status: number,
    type: number,
    hours: number,
    start_time: string,
    end_time: string,
    created_at: string,
    updated_at: string,
    canceled_by: number,
    split_time: null,
    user_status: number
};

type UserObjectType = {
    id: number,
    account_id: number,
    login_id: number,
    timezone_id: number,
    created_by: number,
    role: number,
    is_payroll: boolean,
    is_trusted: number,
    type: number,
    email: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    employee_code: string,
    activated: boolean,
    is_hidden: boolean,
    uuid: string,
    is_private: boolean,
    hours_preferred: number,
    hours_max: number,
    hourly_rate: number,
    alert_settings: {
        timeoff: {
            sms: boolean,
            email: boolean
        },
        swaps: {
            sms: boolean,
            email: boolean
        },
        schedule: {
            sms: boolean,
            email: boolean
        },
        reminders: {
            sms: boolean,
            email: boolean
        },
        availability: {
            sms: boolean,
            email: boolean
        },
        new_employee: {
            sms: boolean,
            email: boolean
        },
        attendance: {
            sms: boolean,
            email: boolean
        },
        payroll: {
            sms: boolean
        },
        workchat: {
            alerts: boolean,
            badge_icon: boolean,
            in_app: boolean
        },
        ot_alerts: {
            sms: boolean,
            email: boolean
        }
    },
    reminder_time: number,
    sleep_start: string,
    sleep_end: string,
    my_positions: number[],
    is_onboarded: boolean,
    last_login: string,
    hired_on: string,
    dismissed_at: string,
    notified_at: string,
    invited_at: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    is_deleted: boolean,
    is_active: boolean,
    password: boolean,
    country_id: number,
    c2dm_auth_key: number,
    migration_id: number,
    affiliate: number,
    infotips: string,
    timezone_name: string,
    avatar: {
        url: string,
        size: string
    },
    positions: number[],
    position_quality: {
        1497798: number,
        4741661: number,
        4883040: number,
        8566692: number,
        8567863: number,
        8584441: number,
        8584443: number,
        8584456: number,
        8598356: number
    },
    position_rates: number[],
    locations: number[],
    country_code: string,
    sort: any,
    is_internal_login: boolean,
    unacknowledged: number[]
};

type ScheduleOptions = {
    start?: string | Date,
    end?: string | Date,
    user_id?: number,
    location_id?: number,
    unpublished?: boolean
};

