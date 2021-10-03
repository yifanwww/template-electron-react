import { IAppDetails } from '@tecra/electron-common';
import { app } from 'electron';

let appDetails: Optional<IAppDetails> = null;

export function getAppDetails(): IAppDetails {
    if (appDetails === null) {
        appDetails = {
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

    return appDetails;
}
