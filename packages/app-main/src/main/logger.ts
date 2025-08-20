import { ArrayUtil } from '@ter/app-common/utils';
import type { ForegroundColorName } from 'chalk';
import chalk from 'chalk';
import dayjs from 'dayjs';
import { app } from 'electron';
import nodePath from 'node:path';
import util from 'node:util';
import winston from 'winston';

import { AppInfo } from './appInfo';

type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'verbose' | 'debug';

interface ILogObject {
    message: string;
    [key: string]: unknown;
}

interface AppLogMethod<TLogger> {
    (message: string | ILogObject): TLogger;
    (message: string, ...meta: unknown[]): TLogger;
}

export interface AppLogger extends Omit<winston.Logger, LogLevel> {
    // The levels we support
    fatal: AppLogMethod<AppLogger>;
    error: AppLogMethod<AppLogger>;
    warn: AppLogMethod<AppLogger>;
    info: AppLogMethod<AppLogger>;
    verbose: AppLogMethod<AppLogger>;
    debug: AppLogMethod<AppLogger>;

    // The built-in levels we don't support
    help: never;
    data: never;
    prompt: never;
    http: never;
    input: never;
    silly: never;
    emerg: never;
    alert: never;
    crit: never;
    warning: never;
    notice: never;
}

function getLogFileName() {
    const timeStr = dayjs.utc(AppInfo.INSTANCE.startedTime).format('YYYYMMDDTHHmmssSSS');
    return nodePath.join(!app.isPackaged ? '.' : AppInfo.INSTANCE.useDataPath, 'logs', `app-${timeStr}.log`);
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
        }) as AppLogger;
    }
}
