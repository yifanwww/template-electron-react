/// <reference types="./assets" />
/// <reference types="./test" />
/// <reference types="./utils.react" />
/// <reference types="./utils.type" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly PUBLIC_URL: string;
    }
}
