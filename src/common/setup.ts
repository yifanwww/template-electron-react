export {};

function getEnvironment(): IEnvironment {
    return {
        compilation: process.env.NODE_ENV as never,
    };
}

function setup(): void {
    // @ts-ignore
    global.Environment = getEnvironment();
}

setup();
