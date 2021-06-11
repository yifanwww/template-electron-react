import path from 'path';

const isInASAR = __dirname.includes('.asar');

export const AppPaths = {
    appPath: isInASAR
        ? // The path to folder `resources` in installation root.
          path.resolve(__dirname, '../..')
        : // The path to folder `build` in project root.
          __dirname,
    srcPath: __dirname,
};
