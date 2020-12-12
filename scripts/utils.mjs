import _child from 'child_process';
import _fs from 'fs';
import _path from 'path';
import _url from 'url';

const __dirname = _path.dirname(_url.fileURLToPath(import.meta.url));
const workingDir = _path.join(__dirname, '../working');

export async function createWorkingDir() {
    try {
        await _fs.promises.mkdir(workingDir);
        console.info(`Created folder "${workingDir}".`);
    } catch (error) {}

    return;
}

export async function executeElectron(command) {
    return new Promise((resolve) => {
        const _process = _child.spawn('npx', command.split(' '), {
            cwd: workingDir,
            shell: true,
            stdio: [process.stdin, process.stdout, process.stderr],
        });

        _process.on('exit', () => resolve());
    });
}
