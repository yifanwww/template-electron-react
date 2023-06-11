// TODO: if we can make sure we don't use `@types/node` in any react packages, then this namespace is unnecessary.
declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly PUBLIC_URL: string;
    }
}

// eslint-disable-next-line vars-on-top, no-var
declare var process: {
    env: NodeJS.ProcessEnv;
};
