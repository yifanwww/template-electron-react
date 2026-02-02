import assert from 'node:assert';
import child from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import type { Configuration } from 'electron-builder';
import { parse } from 'jsonc-parser';
import { paths } from './utils/index.js';

const genCommand = (...params: (string | false | undefined | null)[]) => params.filter(Boolean).join(' ');

type CompilationFlag = 'build' | 'dev';

const compilationMode = {
    build: 'production',
    'build-profile': 'production',
    dev: 'development',
};

export function appMain(): void {
    const flag = process.argv[2] as CompilationFlag;

    assert(flag === 'build' || flag === 'dev');

    const command = genCommand('webpack', '--config', paths.webpackMainConfig, '--mode', compilationMode[flag]);

    console.info(chalk.yellow(command));
    child.execSync(command, { stdio: 'inherit' });
}

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

export function unitTest(watch: boolean): void {
    const argv = process.argv.slice(2);

    const command = genCommand('jest', '--config', paths.jestConfig, watch ? '--watch' : '--coverage', ...argv);
    // console.log(command);

    const env = {
        ...process.env,
        BABEL_ENV: 'test',
        NODE_ENV: 'test',
    };

    child.execSync(command, { env, stdio: 'inherit' });
}
