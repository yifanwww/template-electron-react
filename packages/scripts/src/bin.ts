import child from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import type { Configuration } from 'electron-builder';
import { parse } from 'jsonc-parser';
import { paths } from './utils/index.js';

export async function mkdirWorking(): Promise<void> {
    return fs
        .mkdir(paths.working)
        .then(() => console.info(`Create directory "${paths.working}"`))
        .catch(() => console.info(`Directory "${paths.working}" exists.`));
}

export function runBuild() {
    child.spawn(paths.electron, [paths.repository], { cwd: paths.working, stdio: 'inherit' });
}

export async function runUnpacked() {
    const configRaw = await fs.readFile(path.join(paths.repository, 'electron-builder.json'), 'utf-8');
    const { productName } = parse(configRaw) as Configuration;
    if (productName) {
        child.spawn(path.join(paths.unpackedWinDir, productName), [], { cwd: paths.working, stdio: 'inherit' });
    } else {
        console.error(chalk.red('Cannot find productName in electron-builder.json'));
    }
}
