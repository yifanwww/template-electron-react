import type { AppRendererAPI } from '@tecra/app-common';

declare const window: {
    appAPI: AppRendererAPI;
};

export const { appAPI } = window;
