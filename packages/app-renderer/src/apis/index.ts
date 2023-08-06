import type { AppRendererAPI } from '@ter/app-common/apis/app';

declare const window: {
    appAPI: AppRendererAPI;
};

export const { appAPI } = window;
