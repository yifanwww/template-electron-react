import child from 'node:child_process';
import path from 'node:path';
import packageJson from '../package.json' with { type: 'json' };

const root = path.resolve(import.meta.dirname, '..');

const binary = path.join(path.resolve(root, 'release/win-unpacked'), packageJson.name);
child.spawn(binary, [], { cwd: root, stdio: 'inherit' });
