export function getCacheIdentifier(environment: string, packages: string[]) {
    let cacheIdentifier = environment == null ? '' : environment.toString();
    for (const packageName of packages) {
        cacheIdentifier += `:${packageName}@`;
        try {
            // eslint-disable-next-line
            cacheIdentifier += require(`${packageName}/package.json`).version;
        } catch (_) {
            // ignored
        }
    }
    return cacheIdentifier;
}
