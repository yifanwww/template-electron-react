import util from 'node:util';
import type { ForegroundColorName } from 'chalk';
import chalk from 'chalk';
import { app } from 'electron';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ArrayUtil } from '@shared/utils';
import { appInfo } from './appInfo';

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

  // close the logger and flush all logs to disk
  close(): Promise<void>;
}

// https://github.com/winstonjs/winston/issues/1427
function makeSplatFormat(): winston.Logform.Format {
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

function makeConsoleFormat(colors: Record<string, ForegroundColorName>): winston.Logform.Format {
  return winston.format.printf((_info) => {
    const info = _info as TypedTransformableInfo;

    const color = colors[info.level];

    const levelStr = info.level.toUpperCase().padStart(7);
    const contextStr = `[${info.label}]`;
    const messageStr = String(info.message);

    return [info.timestamp, chalk[color](levelStr), chalk.yellow(contextStr), chalk[color](messageStr)].join(' ');
  });
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`Timed out after ${timeoutMs}ms`)), timeoutMs);
    }),
  ]);
}

export function createLogger(context: string): AppLogger {
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
  const splatFormat = makeSplatFormat();

  const winstonLogger = winston.createLogger({
    transports: ArrayUtil.filterFalsy([
      new DailyRotateFile({
        dirname: appInfo.logsPath,
        filename: 'app-%DATE%.jsonl',
        datePattern: 'YYYY-MM-DD',
        utc: true,
        // maxFiles: '14d',
        level: import.meta.env.DEV ? 'debug' : 'info',
        format: winston.format.combine(labelFormat, winston.format.timestamp(), splatFormat, winston.format.json()),
      }),
      !app.isPackaged &&
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            labelFormat,
            winston.format.timestamp({ format: 'HH:mm:ss.SSS' }),
            splatFormat,
            makeConsoleFormat(colors),
          ),
        }),
    ]),
    levels,
  });

  const logger = winstonLogger as unknown as AppLogger;

  logger.close = () => {
    return withTimeout(
      new Promise<void>((resolve, reject) => {
        winstonLogger.on('finish', resolve);
        winstonLogger.on('error', reject);
        winstonLogger.end();
      }),
      3000,
    );
  };

  return logger;
}

export const globalLogger = createLogger('Global');
