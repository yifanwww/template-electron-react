import type { AppRendererAPI } from '@ter/app-common/apis/app';
import type { LoggerRendererAPI } from '@ter/app-common/apis/logger';

declare const window: {
    /* eslint-disable @typescript-eslint/naming-convention */
    APP_API: AppRendererAPI;
    LOGGER_API: LoggerRendererAPI;
    /* eslint-enable @typescript-eslint/naming-convention */
};

export const { APP_API, LOGGER_API } = window;
