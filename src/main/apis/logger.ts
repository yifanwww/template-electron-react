import type { IpcMain } from 'electron';
import type { LoggerMainAPI } from '@shared/apis/logger';
import { LoggerIpcKey } from '@shared/apis/logger';
import { makeFn } from '@shared/utils';
import type { AppLogger } from '../logger';

export function registerLoggerHandlers(ipc: IpcMain, logger: AppLogger) {
  ipc.handle(
    LoggerIpcKey.LOG,
    makeFn<LoggerMainAPI['handleLog']>((_, level, message, meta) => void logger.log(level, message, meta)),
  );
  ipc.handle(
    LoggerIpcKey.DEBUG,
    makeFn<LoggerMainAPI['handleDebug']>((_, message, meta) => void logger.debug(message, meta)),
  );
  ipc.handle(
    LoggerIpcKey.ERROR,
    makeFn<LoggerMainAPI['handleError']>((_, message, meta) => void logger.error(message, meta)),
  );
  ipc.handle(
    LoggerIpcKey.INFO,
    makeFn<LoggerMainAPI['handleInfo']>((_, message, meta) => void logger.info(message, meta)),
  );
  ipc.handle(
    LoggerIpcKey.WARN,
    makeFn<LoggerMainAPI['handleWarn']>((_, message, meta) => void logger.warn(message, meta)),
  );
  ipc.handle(
    LoggerIpcKey.VERBOSE,
    makeFn<LoggerMainAPI['handleVerbose']>((_, message, meta) => void logger.verbose(message, meta)),
  );
}
