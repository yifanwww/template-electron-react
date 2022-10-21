import babelJest from 'babel-jest';

export = babelJest.createTransformer!({
    presets: [
        [require.resolve('babel-preset-react-app'), { runtime: 'automatic' }],
        [
            '@babel/preset-typescript',
            {
                // Can omit this setting when babel is upgrade above v8
                // https://github.com/babel/babel/issues/10746
                allowDeclareFields: true,
            },
        ],
    ],
    babelrc: false,
    configFile: false,
});
