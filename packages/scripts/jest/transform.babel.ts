import babelJest from 'babel-jest';

export = babelJest.createTransformer({
    presets: [[require.resolve('babel-preset-react-app'), { runtime: 'automatic' }]],
    babelrc: false,
    configFile: false,
});
