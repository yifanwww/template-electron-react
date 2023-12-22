import { ArrayUtil } from '@ter/app-common/utils';
import type { ForegroundColorName } from 'chalk';
import chalk from 'chalk';
import dayjs from 'dayjs';
import { app } from 'electron';
import nodePath from 'node:path';
import util from 'node:util';
import winston from 'winston';

import { AppInfo } from './appInfo';

export interface AppLogger extends winston.Logger {
    // The levels we support
    fatal: winston.LeveledLogMethod;
    error: winston.LeveledLogMethod;
    warn: winston.LeveledLogMethod;
    info: winston.LeveledLogMethod;
    verbose: winston.LeveledLogMethod;
    debug: winston.LeveledLogMethod;

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
            const message = info.message as unknown;
            // eslint-disable-next-line no-param-reassign
            info.message = util.format(message, ...args);
            return info;
        },
    };
}

function format(colors?: Record<string, ForegroundColorName>): winston.Logform.Format {
    interface TypedTransformableInfo extends winston.Logform.TransformableInfo {
        label: string;
        timestamp: string;
    }

    return winston.format.printf((info) => {
        const typedInfo = info as TypedTransformableInfo;

        const color = colors?.[typedInfo.level];

        const levelStr = typedInfo.level.toUpperCase().padStart(7);
        const contextStr = `[${typedInfo.label}]`;
        const messageStr = String(typedInfo.message);

        return [
            typedInfo.timestamp,
            color ? chalk[color](levelStr) : levelStr,
            color ? chalk.yellow(contextStr) : contextStr,
            color ? chalk[color](messageStr) : messageStr,
        ].join(' ');
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
        if (!AppLoggerService._instance) {
            AppLoggerService._instance = AppLoggerService.createLogger('Application');
        }
        return AppLoggerService._instance;
    }

    static createLogger(context: string): AppLogger {
        const levels: winston.config.AbstractConfigSetLevels = {
            fatal: 0,
            error: 1,
            warn: 2,
            info: 3,
            verbose: 4,
            debug: 5,
        };

        const colors: Record<string, ForegroundColorName> = {
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
                        format: winston.format.combine(labelFormat, timestampFormat, splatFormat, format(colors)),
                    }),
            ]),
            levels,
        }) as AppLogger;
    }
}
