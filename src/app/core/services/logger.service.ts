import { Injectable } from "@angular/core";

import { LogEntry } from "../models/log-entry.model";
import { LoggingLevelEnum } from "../models/loggin-level.enum";

@Injectable({
    providedIn: "root"
})
export class LoggerService {
    private logs: LogEntry[] = [];

    public log(message: string, options?: any) {
        this.logs.push({ message: message, level: LoggingLevelEnum.Log });
        if (!options) {
            console.log(message);
        } else {
            console.log(message, options);
        }
    }

    public warn(message: string) {
        this.logs.push({ message: message, level: LoggingLevelEnum.Warn });
        console.warn(message);
    }

    public error(message: string) {
        this.logs.push({ message: message, level: LoggingLevelEnum.Error });
        console.error(message);
    }
}
