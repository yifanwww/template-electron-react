import { createHash } from 'node:crypto';

/**
 * @param {Record<string, unknown>} env
 */
export function createEnvironmentHash(env) {
    return createHash('md5').update(JSON.stringify(env)).digest('hex');
}
