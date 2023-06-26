import type { AppDetails } from '@tecra/app-common';
import { app } from 'electron';

export function getAppDetails(): AppDetails {
    return {
        name: app.getName(),
        version: app.getVersion(),
        module: {
            chrome: process.versions.chrome,
            electron: process.versions.electron,
            node: process.versions.node,
            v8: process.versions.v8,
        },
    };
}
