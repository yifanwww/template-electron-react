import type { IpcMain } from 'electron';
import type { LoggingMainAPI } from '@shared/logging/apis';
import { LoggingIpcKey } from '@shared/logging/apis';
import { makeFn } from '@shared/utils';
import type { AppLogger } from '../logger';

export function registerLoggingHandlers(ipc: IpcMain, logger: AppLogger) {
  ipc.handle(
    LoggingIpcKey.DEBUG,
    makeFn<LoggingMainAPI['handleDebug']>((_, message, context) => void logger.debug(message, context)),
  );
  ipc.handle(
    LoggingIpcKey.ERROR,
    makeFn<LoggingMainAPI['handleError']>((_, message, context) => void logger.error(message, context)),
  );
  ipc.handle(
    LoggingIpcKey.INFO,
    makeFn<LoggingMainAPI['handleInfo']>((_, message, context) => void logger.info(message, context)),
  );
  ipc.handle(
    LoggingIpcKey.WARN,
    makeFn<LoggingMainAPI['handleWarn']>((_, message, context) => void logger.warn(message, context)),
  );
}
