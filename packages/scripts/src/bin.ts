import chalk from 'chalk';
import assert from 'node:assert';
import child from 'node:child_process';
import fs from 'node:fs';

import { paths } from './utils/paths';

const genCommand = (...params: (string | false | undefined | null)[]) => params.filter(Boolean).join(' ');

type CompilationFlagMain = 'build' | 'dev';
type CompilationFlagRenderer = 'build' | 'build-profile' | 'dev';

const compilationMode = {
    build: 'production',
    'build-profile': 'production',
    dev: 'development',
};

export function appMain(): void {
    const flag = process.argv[2] as CompilationFlagMain;

    assert(flag === 'build' || flag === 'dev');

    const command = genCommand('webpack', '--config', paths.webpackMainConfig, '--mode', compilationMode[flag]);

    const env = {
        ...process.env,
        BABEL_ENV: compilationMode[flag],
        NODE_ENV: compilationMode[flag],
    };

    console.info(chalk.yellow(command));
    child.execSync(command, { env, stdio: 'inherit' });
}

export function appRenderer(): void {
    const flag = process.argv[2] as CompilationFlagRenderer;

    assert(flag === 'build' || flag === 'dev' || flag === 'build-profile');

    const command = genCommand(
        'react-app-rewired',
        flag === 'dev' ? 'start' : 'build',
        '--config-overrides',
        paths.webpackRendererConfig,
        flag === 'build-profile' && '--profile',
    );

    console.info(chalk.yellow(command));
    child.execSync(command, { stdio: 'inherit' });
}

export async function mkdirWorking(): Promise<void> {
    return fs.promises
        .mkdir(paths.working)
        .then(() => console.info(`Create directory "${paths.working}"`))
        .catch(() => console.info(`Directory "${paths.working}" exists.`));
}

export const runBuild = () => child.spawn(paths.electron, [paths.repository], { cwd: paths.working, stdio: 'inherit' });

export const runUnpacked = () => child.spawn(paths.unpacked, [], { cwd: paths.working, stdio: 'inherit' });

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
