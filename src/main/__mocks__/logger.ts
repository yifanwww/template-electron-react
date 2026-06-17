import type { AppLogger } from '../logger';

export function createLogger(): AppLogger {
  const logger: AppLogger = {
    log: () => logger,
    fatal: () => logger,
    error: () => logger,
    warn: () => logger,
    info: () => logger,
    verbose: () => logger,
    debug: () => logger,
  };
  return logger;
}

export const globalLogger = createLogger();
