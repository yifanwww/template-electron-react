import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { appInfo } from './appInfo';

interface ILogObject {
  message: string;
  [key: string]: unknown;
}

interface AppLogMethod {
  (level: string, message: string): AppLogger;
  (level: string, message: string, meta: object): AppLogger;
}

interface AppLeveledLogMethod {
  (message: string | ILogObject): AppLogger;
  (message: string, meta: object): AppLogger;
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

  // create a child logger with additional options
  child(options: Record<string, unknown>): AppLogger;
}

const winstonLogger = winston.createLogger({
  transports: [
    new DailyRotateFile({
      dirname: appInfo.logsPath,
      filename: 'app-%DATE%.jsonl',
      datePattern: 'YYYY-MM-DD',
      utc: true,
      // maxFiles: '14d',
      level: import.meta.env.DEV ? 'debug' : 'info',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
  ],
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    verbose: 4,
    debug: 5,
  },
});

const baseLogger = winstonLogger as unknown as AppLogger;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
    }),
  ]);
}

baseLogger.close = function close() {
  return withTimeout(
    new Promise<void>((resolve, reject) => {
      winstonLogger.on('finish', resolve);
      winstonLogger.on('error', reject);
      winstonLogger.end();
    }),
    3000,
  );
};

export function createLogger(label: string): AppLogger {
  return baseLogger.child({ label });
}

export const logger = createLogger('global');
