import type { AppRendererAPI } from '@shared/app/apis';
import type { LoggingRendererAPI } from '@shared/logging/apis';

declare const window: {
  __API_APP: AppRendererAPI;
  __API_LOGGING: LoggingRendererAPI;
};

export const { __API_APP: AppAPI, __API_LOGGING: Logging } = window;
