import type { AppRendererAPI } from '@ter/app-common';

declare const window: {
    appAPI: AppRendererAPI;
};

export const { appAPI } = window;
