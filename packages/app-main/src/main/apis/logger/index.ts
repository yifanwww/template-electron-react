import type { LoggerMainAPI } from '@app/common/apis/logger';
import { LoggerAPIKey } from '@app/common/apis/logger';
import type { IpcMain } from 'electron';

import type { AppLogger } from 'src/main/logger';

export function registerLoggerHandlers(ipc: IpcMain, logger: AppLogger) {
    const handlers: LoggerMainAPI = {
        handleLog: (_, level, message, ...meta) => void logger.log(level, message, ...meta),

        handleDebug: (_, message, ...meta) => void logger.debug(message, ...meta),
        handleError: (_, message, ...meta) => void logger.error(message, ...meta),
        handleInfo: (_, message, ...meta) => void logger.info(message, ...meta),
        handleWarn: (_, message, ...meta) => void logger.warn(message, ...meta),
        handleVerbose: (_, message, ...meta) => void logger.verbose(message, ...meta),
    };

    ipc.handle(LoggerAPIKey.LOG, handlers.handleLog);
    ipc.handle(LoggerAPIKey.DEBUG, handlers.handleDebug);
    ipc.handle(LoggerAPIKey.ERROR, handlers.handleError);
    ipc.handle(LoggerAPIKey.INFO, handlers.handleInfo);
    ipc.handle(LoggerAPIKey.WARN, handlers.handleWarn);
    ipc.handle(LoggerAPIKey.VERBOSE, handlers.handleVerbose);
}
