import type { AppLogger, AppManagedLogger } from '../logger';

export function createLogger(): AppLogger {
  const logger: AppLogger = {
    error: () => {},
    warn: () => {},
    info: () => {},
    debug: () => {},
  };
  return logger;
}

export function createManagedLogger(): AppManagedLogger {
  const logger: AppManagedLogger = {
    fatal: () => {},
    error: () => {},
    warn: () => {},
    info: () => {},
    debug: () => {},
    close: async () => {},
  };
  return logger;
}
