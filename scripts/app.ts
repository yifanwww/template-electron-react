import child from 'child_process';
import _electron from 'electron';
import fs from 'fs';
import path from 'path';

const workingDir = path.join(__dirname, '../working');
const electron = (_electron as unknown) as string;

async function createFolder(dir: string): Promise<void> {
    try {
        await fs.promises.mkdir(dir);
        console.info(`Create directory "${dir}".`);
    } catch (error) {
        console.info(`Directory "${dir}" exists.`);
    }
}

async function executeElectron(args: string): Promise<void> {
    return new Promise((resolve) => {
        const process = child.spawn(electron, args.split(' ').slice(1), { cwd: workingDir, stdio: 'inherit' });

        process.on('exit', () => resolve());
    });
}

async function main(): Promise<void> {
    await createFolder(workingDir);
    return executeElectron('electron ..');
}

main();
