import path from 'node:path';
import util from 'node:util';
import { ArrayUtil } from '@app/common/utils';
import type { ForegroundColorName } from 'chalk';
import chalk from 'chalk';
import dayjs from 'dayjs';
import { app } from 'electron';
import winston from 'winston';
import { AppInfo } from './appInfo';

type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'verbose' | 'debug';

interface ILogObject {
    message: string;
    [key: string]: unknown;
}

interface AppLogMethod {
    (level: string, message: string): AppLogger;
    (level: string, message: string, ...meta: unknown[]): AppLogger;
}

interface AppLeveledLogMethod {
    (message: string | ILogObject): AppLogger;
    (message: string, ...meta: unknown[]): AppLogger;
}

export interface AppLogger {
    log: AppLogMethod;

    // The levels we support
    fatal: AppLeveledLogMethod;
    error: AppLeveledLogMethod;
    warn: AppLeveledLogMethod;
    info: AppLeveledLogMethod;
    verbose: AppLeveledLogMethod;
    debug: AppLeveledLogMethod;
}

function getLogFileName() {
    const timeStr = dayjs.utc(AppInfo.INSTANCE.startedTime).format('YYYYMMDDTHHmmssSSS');
    return path.join(AppInfo.INSTANCE.userDataPath, 'logs', `app-${timeStr}.log`);
}

// https://github.com/winstonjs/winston/issues/1427
function splat(): winston.Logform.Format {
    return {
        transform: (info) => {
            const args = (info[Symbol.for('splat')] ?? []) as unknown[];
            const { message } = info;
            // eslint-disable-next-line no-param-reassign
            info.message = util.format(message, ...args);
            return info;
        },
    };
}

interface TypedTransformableInfo extends winston.Logform.TransformableInfo {
    label: string;
    timestamp: string;
}

function format(): winston.Logform.Format {
    return winston.format.printf((_info) => {
        const info = _info as TypedTransformableInfo;

        const levelStr = info.level.toUpperCase().padStart(7);
        const contextStr = `[${info.label}]`;
        const messageStr = String(info.message);

        return [info.timestamp, levelStr, contextStr, messageStr].join(' ');
    });
}

function formatColorfully(colors: Record<string, ForegroundColorName>): winston.Logform.Format {
    return winston.format.printf((_info) => {
        const info = _info as TypedTransformableInfo;

        const color = colors[info.level];

        const levelStr = info.level.toUpperCase().padStart(7);
        const contextStr = `[${info.label}]`;
        const messageStr = String(info.message);

        return [info.timestamp, chalk[color](levelStr), chalk.yellow(contextStr), chalk[color](messageStr)].join(' ');
    });
}

export class AppLoggerService {
    /**
     * The instance for electron main process to log logs.
     */
    private static _instance?: AppLogger;

    /**
     * The instance for electron main process to log logs.
     */
    static get INSTANCE(): AppLogger {
        AppLoggerService._instance ??= AppLoggerService.createLogger('Application');
        return AppLoggerService._instance;
    }

    static createLogger(context: string): AppLogger {
        const levels: Record<LogLevel, number> = {
            fatal: 0,
            error: 1,
            warn: 2,
            info: 3,
            verbose: 4,
            debug: 5,
        };

        const colors: Record<LogLevel, ForegroundColorName> = {
            fatal: 'magentaBright',
            error: 'red',
            warn: 'yellow',
            info: 'green',
            verbose: 'cyan',
            debug: 'blue',
        };

        const labelFormat = winston.format.label({ label: context });
        const timestampFormat = winston.format.timestamp({ format: 'YYYY-MM-DD, HH:mm:ss.SSS' });
        const splatFormat = splat();

        return winston.createLogger({
            transports: ArrayUtil.filterFalsy([
                new winston.transports.File({
                    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
                    filename: getLogFileName(),
                    options: { flags: 'a' },
                    format: winston.format.combine(labelFormat, timestampFormat, splatFormat, format()),
                }),
                !app.isPackaged &&
                    new winston.transports.Console({
                        level: 'debug',
                        format: winston.format.combine(
                            labelFormat,
                            timestampFormat,
                            splatFormat,
                            formatColorfully(colors),
                        ),
                    }),
            ]),
            levels,
        }) as unknown as AppLogger;
    }
}
