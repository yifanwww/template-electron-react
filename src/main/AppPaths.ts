import path from 'path';

function getAppPaths() {
    const isInASAR = __dirname.includes('.asar');

    const appPath = isInASAR
        ? // The path to folder `resources` in installation root.
          path.resolve(__dirname, '../..')
        : // The path to folder `build` in project root.
          __dirname;

    const srcPath = __dirname;

    return {
        appPath,
        srcPath,
    };
}

export const AppPaths = getAppPaths();
