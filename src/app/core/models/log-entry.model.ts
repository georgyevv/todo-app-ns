import { LoggingLevelEnum } from './loggin-level.enum';

export interface LogEntry {
    message: string;
    level: LoggingLevelEnum;
}
