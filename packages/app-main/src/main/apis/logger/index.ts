import type { LoggerMainAPI } from '@ter/app-common/apis/logger';
import { LoggerAPIChannel } from '@ter/app-common/apis/logger';
import type { IpcMain } from 'electron';
import type winston from 'winston';

export function registerLoggerHandlers(ipc: IpcMain, logger: winston.Logger) {
    const handleLog: LoggerMainAPI['handleLog'] = (_, level, message, ...meta) =>
        void logger.log(level, message, ...meta);
    const handleDebug: LoggerMainAPI['handleDebug'] = (_, message, ...meta) => void logger.debug(message, ...meta);
    const handleError: LoggerMainAPI['handleError'] = (_, message, ...meta) => void logger.error(message, ...meta);
    const handleInfo: LoggerMainAPI['handleInfo'] = (_, message, ...meta) => void logger.info(message, ...meta);
    const handleWarn: LoggerMainAPI['handleWarn'] = (_, message, ...meta) => void logger.warn(message, ...meta);
    const handleVerbose: LoggerMainAPI['handleVerbose'] = (_, message, ...meta) =>
        void logger.verbose(message, ...meta);

    ipc.handle(LoggerAPIChannel.LOG, handleLog);
    ipc.handle(LoggerAPIChannel.DEBUG, handleDebug);
    ipc.handle(LoggerAPIChannel.ERROR, handleError);
    ipc.handle(LoggerAPIChannel.INFO, handleInfo);
    ipc.handle(LoggerAPIChannel.WARN, handleWarn);
    ipc.handle(LoggerAPIChannel.VERBOSE, handleVerbose);
}
