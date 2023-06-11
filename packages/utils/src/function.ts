export function abstractFn(): never {
    throw new Error('Not Implemented');
}

export function abstractAsyncFn(): Promise<never> {
    return Promise.reject(new Error('Not Implemented'));
}
