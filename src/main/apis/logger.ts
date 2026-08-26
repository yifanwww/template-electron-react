import type { IpcMain } from 'electron';
import type { LoggerMainAPI } from '@shared/apis/logger';
import { LoggerIpcKey } from '@shared/apis/logger';
import { makeFn } from '@shared/utils';
import type { AppLogger } from '../logger';

export function registerLoggerHandlers(ipc: IpcMain, logger: AppLogger) {
  ipc.handle(
    LoggerIpcKey.DEBUG,
    makeFn<LoggerMainAPI['handleDebug']>((_, message, context) => void logger.debug(message, context)),
  );
  ipc.handle(
    LoggerIpcKey.ERROR,
    makeFn<LoggerMainAPI['handleError']>((_, message, context) => void logger.error(message, context)),
  );
  ipc.handle(
    LoggerIpcKey.INFO,
    makeFn<LoggerMainAPI['handleInfo']>((_, message, context) => void logger.info(message, context)),
  );
  ipc.handle(
    LoggerIpcKey.WARN,
    makeFn<LoggerMainAPI['handleWarn']>((_, message, context) => void logger.warn(message, context)),
  );
}
