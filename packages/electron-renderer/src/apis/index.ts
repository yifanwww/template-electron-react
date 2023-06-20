import type { AppRendererAPI } from '@tecra/electron-common';

declare const window: {
    appAPI: AppRendererAPI;
};

export const { appAPI } = window;
