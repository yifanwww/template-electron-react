import type { AppLogger } from '../logger';

export class AppLoggerService {
    static readonly INSTANCE = AppLoggerService.createLogger();

    static createLogger(): AppLogger {
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
}
