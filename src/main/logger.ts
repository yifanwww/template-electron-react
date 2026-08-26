import path from 'node:path';
import { app } from 'electron';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export interface AppLogger {
  error: (message: string, context?: object) => void;
  warn: (message: string, context?: object) => void;
  info: (message: string, context?: object) => void;
  debug: (message: string, context?: object) => void;
}

export interface AppManagedLogger extends AppLogger {
  fatal: (message: string, context?: object) => void;
  close(): Promise<void>;
}

let _winstonLogger: winston.Logger | undefined;

function createWinstonLogger(): winston.Logger {
  if (_winstonLogger) {
    return _winstonLogger;
  }

  if (!app.isPackaged) {
    // In development environment and test environment, put the logs into the `working/logs` directory.
    app.setAppLogsPath(path.resolve('working/logs'));
  }

  _winstonLogger = winston.createLogger({
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
      debug: 4,
    },
  });

  return _winstonLogger;
}

function wrapLogger(winstonLogger: winston.Logger): AppLogger {
  const logger: AppLogger = {
    error: (message, _context) => {
      winstonLogger.log('error', message, _context);
    },
    warn: (message, _context) => {
      winstonLogger.log('warn', message, _context);
    },
    info: (message, _context) => {
      winstonLogger.log('info', message, _context);
    },
    debug: (message, _context) => {
      winstonLogger.log('debug', message, _context);
    },
  };

  return logger;
}

export function createLogger(context: object): AppLogger {
  const winstonLogger = createWinstonLogger().child(context);
  return wrapLogger(winstonLogger);
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
    }),
  ]);
}

export function createManagedLogger(): AppManagedLogger {
  const winstonLogger = createWinstonLogger().child({ service: 'app' });

  const logger = wrapLogger(winstonLogger) as AppManagedLogger;

  logger.fatal = (message, context) => {
    winstonLogger.log('fatal', message, context);
  };

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
