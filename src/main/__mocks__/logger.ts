import type { AppLogger } from '../logger';

export function getLogger(): AppLogger {
  const logger: AppLogger = {
    log: () => logger,
    fatal: () => logger,
    error: () => logger,
    warn: () => logger,
    info: () => logger,
    verbose: () => logger,
    debug: () => logger,
    close: async () => {},
    child: () => logger,
  };
  return logger;
}
