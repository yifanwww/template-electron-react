import type { WindowType } from '@ter/app-common/apis/app';
import { ArrayUtil } from '@ter/app-common/utils';
import dayjs from 'dayjs';
import { app } from 'electron';
import nodePath from 'node:path';
import util from 'node:util';
import winston from 'winston';

import { AppInfo } from './appInfo';

// reference: https://mifi.no/blog/winston-electron-logger/

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

export class Logger {
    /**
     * The instance for electron main process to log logs.
     */
    private declare static _instance?: winston.Logger;

    /**
     * The instance for electron main process to log logs.
     */
    static get INSTANCE(): winston.Logger {
        if (!Logger._instance) {
            Logger._instance = Logger.createLogger();
        }
        return Logger._instance;
    }

    private static _getLogFileName() {
        const timeStr = dayjs.utc(AppInfo.INSTANCE.startedTime).format('YYYYMMDDTHHmmssSSS');
        return nodePath.join(!app.isPackaged ? '.' : AppInfo.INSTANCE.useDataPath, 'logs', `app-${timeStr}.log`);
    }

    static createLogger(type?: WindowType): winston.Logger {
        return winston.createLogger({
            format: winston.format.combine(
                winston.format.timestamp(),
                combineMessageAndSplat(),
                winston.format.printf((info) =>
                    type
                        ? `[${String(info.timestamp)}] [${type}] <${info.level}>: ${String(info.message)}`
                        : `[${String(info.timestamp)}] <${info.level}>: ${String(info.message)}`,
                ),
            ),
            transports: ArrayUtil.filterFalsy([
                new winston.transports.File({
                    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
                    filename: Logger._getLogFileName(),
                    options: { flags: 'a' },
                }),
                !app.isPackaged && new winston.transports.Console(),
            ]),
        });
    }
}
