import _child from 'child_process';
import _fs from 'fs';
import _path from 'path';
import _url from 'url';

const __dirname = _path.dirname(_url.fileURLToPath(import.meta.url));
const workingDir = _path.join(__dirname, '../working');

async function mkdirWorking() {
    console.info(`Created folder "${workingDir}".`);
    return _fs.promises
        .mkdir(workingDir)
        .then(() => {})
        .catch(() => {});
}

export async function executeElectron(command) {
    await mkdirWorking();

    return new Promise((resolve) => {
        const _process = _child.spawn('npx', command.split(' '), {
            cwd: workingDir,
            shell: true,
            stdio: [process.stdin, process.stdout, process.stderr],
        });

        _process.on('exit', () => resolve());
    });
}
