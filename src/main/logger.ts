import path from 'node:path';
import { app } from 'electron';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

interface ILogObject {
  message: string;
  [key: string]: unknown;
}

type AppLogMethod = (level: string, message: string, meta?: object) => AppLogger;

interface AppLeveledLogMethod {
  (message: string | ILogObject): AppLogger;
  (message: string, meta?: object): AppLogger;
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

export function configureLogsPath() {
  if (!app.isPackaged) {
    // In development environment and test environment, put the logs into the `working/logs` directory.
    app.setAppLogsPath(path.resolve('working/logs'));
  }
}

function createBaseLogger(): AppLogger {
  const winstonLogger = winston.createLogger({
    transports: [
      new DailyRotateFile({
        dirname: app.getPath('logs'),
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

  const _baseLogger = winstonLogger as unknown as AppLogger;

  function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
      }),
    ]);
  }

  _baseLogger.close = function close() {
    return withTimeout(
      new Promise<void>((resolve, reject) => {
        winstonLogger.on('finish', resolve);
        winstonLogger.on('error', reject);
        winstonLogger.end();
      }),
      3000,
    );
  };

  return _baseLogger;
}

let baseLogger: AppLogger | undefined;

function getBaseLogger(): AppLogger {
  baseLogger ??= createBaseLogger();
  return baseLogger;
}

let globalLogger: AppLogger | undefined;

export function getLogger(label?: string): AppLogger {
  if (!label || label === 'global') {
    globalLogger ??= getBaseLogger().child({ label: 'global' });
    return globalLogger;
  }

  return getBaseLogger().child({ label });
}
