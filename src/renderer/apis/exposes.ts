import type { AppRendererAPI } from '@shared/app/apis';
import type { LoggingRendererAPI } from '@shared/logging/apis';

declare const window: {
  /* eslint-disable @typescript-eslint/naming-convention */
  __API_APP: AppRendererAPI;
  __API_LOGGING: LoggingRendererAPI;
  /* eslint-enable @typescript-eslint/naming-convention */
};

export const { __API_APP: AppAPI, __API_LOGGING: Logging } = window;
