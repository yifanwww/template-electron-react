import chalk from 'chalk';
import child from 'child_process';
import concurrently from 'concurrently';
import fs from 'fs';

import { paths } from './utils/paths';

const genCommand = (...params: (string | false | undefined | null)[]) => params.filter(Boolean).join(' ');
const genBuildCommand = (name: string) => `pnpm run --filter ${name} build`;

type Order = Array<string | string[]>;

const maxProcesses = 4;

export async function buildPackages(): Promise<void> {
    const order: Order = [
        /* ----- may be used by all other packages ----- */
        ['@tecra/utils-type', '@tecra/utils-test'],

        /* ----- product packages ----- */
        ['@tecra/assets', '@tecra/hooks', '@tecra/utils-react', '@tecra/utils-redux', '@tecra/electron-common'],
    ];

    for (const names of order) {
        if (typeof names === 'string') {
            const command = genBuildCommand(names);
            child.execSync(command, { stdio: 'inherit' });
        } else {
            // eslint-disable-next-line no-await-in-loop
            await concurrently(
                names.map((name) => ({ command: genBuildCommand(name), name })),
                { maxProcesses },
            ).result;
        }
    }
}

type CompilationFlagMain = 'build' | 'dev';
type CompilationFlagRenderer = 'build' | 'build-profile' | 'dev';

const compilationMode = {
    build: 'production',
    'build-profile': 'production',
    dev: 'development',
};

function checkFlag<T>(
    type: 'main' | 'renderer',
    flag: T extends 'main' ? CompilationFlagMain : CompilationFlagRenderer,
): void {
    function printHelpInfo(): void {
        console.error(chalk.red(`electron-${type} [mode]`));
        console.error(
            chalk.red(
                type === 'main' ? '[mode] can be "build" or "dev"' : '[mode] can be "build", "build-profile" or "dev"',
            ),
        );
    }

    if (flag === undefined) {
        printHelpInfo();
        process.exit(1);
    } else if (
        flag !== 'build' &&
        flag !== 'dev' &&
        (type !== 'renderer' || (type === 'renderer' && flag !== 'build-profile'))
    ) {
        console.error(chalk.red(`Unknown argument "mode": ${flag}\n`));
        printHelpInfo();
        process.exit(1);
    }
}

export function electronMain(): void {
    const flag = process.argv[2] as CompilationFlagMain;

    checkFlag('main', flag);

    const command = genCommand('webpack', '--config', paths.webpackMainConfig, '--mode', compilationMode[flag]);

    const env = {
        ...process.env,
        BABEL_ENV: compilationMode[flag],
        NODE_ENV: compilationMode[flag],
    };

    console.info(chalk.yellow(command));
    child.execSync(command, { env, stdio: 'inherit' });
}

export function electronRenderer(): void {
    const flag = process.argv[2] as CompilationFlagRenderer;

    checkFlag('renderer', flag);

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
