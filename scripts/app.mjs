import _child from 'child_process';
import _electron from 'electron';
import _fs from 'fs';
import _path from 'path';
import _url from 'url';

const __dirname = _path.dirname(_url.fileURLToPath(import.meta.url));
const workingDir = _path.join(__dirname, '../working');

async function createFolder(dir) {
    try {
        await _fs.promises.mkdir(dir);
        console.info(`Create directory "${dir}".`);
    } catch (error) {
        console.info(`Directory "${dir}" exists.`);
    }
}

async function executeElectron(args) {
    return new Promise((resolve) => {
        const _process = _child.spawn(_electron, args.split(' ').slice(1), {
            cwd: workingDir,
            stdio: 'inherit',
        });

        _process.on('exit', () => resolve());
    });
}

async function main() {
    await createFolder(workingDir);
    return executeElectron('electron ..');
}

main();
