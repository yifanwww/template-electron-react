import type { AppRendererAPI } from '@shared/apis/app';
import type { LoggerRendererAPI } from '@shared/apis/logger';

declare const window: {
    /* eslint-disable @typescript-eslint/naming-convention */
    __API_APP: AppRendererAPI;
    __API_LOGGER: LoggerRendererAPI;
    /* eslint-enable @typescript-eslint/naming-convention */
};

export const { __API_APP: AppAPI, __API_LOGGER: Logger } = window;
