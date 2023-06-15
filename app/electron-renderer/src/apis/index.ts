import type { AppRendererAPI } from '@tecra-pkg/electron-common';

declare const window: {
    appAPI: AppRendererAPI;
};

export const { appAPI } = window;
