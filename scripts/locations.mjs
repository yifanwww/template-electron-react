import path from 'node:path';

export const root = path.resolve(import.meta.dirname, '..');

export const workingDir = path.join(root, 'working');
