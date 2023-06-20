import { createHash } from 'node:crypto';

export function createEnvironmentHash(env: Record<string, unknown>) {
    return createHash('md5').update(JSON.stringify(env)).digest('hex');
}
