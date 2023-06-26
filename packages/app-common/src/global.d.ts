interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
}

// eslint-disable-next-line vars-on-top, no-var
declare var process: {
    env: ProcessEnv;
};
