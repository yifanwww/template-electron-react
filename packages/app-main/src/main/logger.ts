import { ArrayUtil } from '@ter/app-common/utils';
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

// https://github.com/winstonjs/winston/issues/1427
function combineMessageAndSplat(): winston.Logform.Format {
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
            AppLoggerService._instance = AppLoggerService.createLogger();
        }
        return AppLoggerService._instance;
    }

    private static _getLogFileName() {
        const timeStr = dayjs.utc(AppInfo.INSTANCE.startedTime).format('YYYYMMDDTHHmmssSSS');
        return nodePath.join(!app.isPackaged ? '.' : AppInfo.INSTANCE.useDataPath, 'logs', `app-${timeStr}.log`);
    }

    static createLogger(label?: string): AppLogger {
        const levels: winston.config.AbstractConfigSetLevels = {
            fatal: 0,
            error: 1,
            warn: 2,
            info: 3,
            verbose: 4,
            debug: 5,
        };

        return winston.createLogger({
            format: winston.format.combine(
                winston.format.timestamp(),
                combineMessageAndSplat(),
                winston.format.printf((info) =>
                    label
                        ? `[${String(info.timestamp)}] (${label}) [${info.level}]: ${String(info.message)}`
                        : `[${String(info.timestamp)}] [${info.level}]: ${String(info.message)}`,
                ),
            ),
            transports: ArrayUtil.filterFalsy([
                new winston.transports.File({
                    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
                    filename: AppLoggerService._getLogFileName(),
                    options: { flags: 'a' },
                }),
                !app.isPackaged && new winston.transports.Console(),
            ]),
            levels,
        }) as AppLogger;
    }
}
