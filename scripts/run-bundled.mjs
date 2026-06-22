import child from 'node:child_process';
import path from 'node:path';
import packageJson from '../package.json' with { type: 'json' };

const root = path.resolve(import.meta.dirname, '..');

const binary = path.join(path.resolve(root, `release/${packageJson.version}/win-unpacked`), 'Template Electron React.exe');
child.spawn(binary, [], { cwd: root, stdio: 'inherit' });
