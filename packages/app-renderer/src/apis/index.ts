import type { AppRendererAPI } from '@ter/app-common/apis/app';
import type { LoggerRendererAPI } from '@ter/app-common/apis/logger';

declare const window: {
    appAPI: AppRendererAPI;
    loggerAPI: LoggerRendererAPI;
};

export const { appAPI, loggerAPI } = window;
