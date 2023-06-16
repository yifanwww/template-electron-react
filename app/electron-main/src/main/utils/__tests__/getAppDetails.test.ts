import { getAppDetails } from '../getAppDetails';

jest.mock('electron', () => {
    const app: Partial<typeof import('electron')['app']> = {
        getName: () => 'tecra',
        getVersion: () => '<app-version>',
    };

    return { app };
});

describe(`Test fn ${getAppDetails.name}`, () => {
    beforeEach(() => {
        const process = {
            versions: {
                chrome: '<chrome-version>',
                electron: '<electron-version>',
                node: '<node-version>',
                v8: '<v8-version>',
                ares: '<ares-version>',
                http_parser: '<http-parser-version>',
                modules: '<modules-version>',
                openssl: '<openssl-version>',
                uv: '<uv-version>',
                zlib: '<zlib-version>',
            },
        };
        global.process = process as typeof global.process;
    });

    it('should return app details', () => {
        expect(getAppDetails()).toMatchSnapshot();
    });
});
