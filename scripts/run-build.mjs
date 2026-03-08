import child from 'node:child_process';
import _electron from 'electron';
import { root, workingDir } from './locations.mjs';

/** @type {string} */
const electron = _electron;

function main() {
    child.spawn(electron, [root], { cwd: workingDir, stdio: 'inherit' });
}

main();
