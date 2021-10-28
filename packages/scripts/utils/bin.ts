import chalk from 'chalk';
import child from 'child_process';
import fs from 'fs';

import { paths } from './paths';

const genCommand = <T extends (string | false | undefined | null)[]>(...params: T) => params.filter(Boolean).join(' ');

export function buildPackages(): void {
    const packagesOrder = [
        /* ----- may be used by all other packages ----- */
        '@tecra/utils-type',
        '@tecra/utils-test',

        /* ----- product packages ----- */
        '@tecra/assets',
        '@tecra/hooks',
        '@tecra/utils-fluentui',
        '@tecra/utils-react',
        '@tecra/utils-redux',
        '@tecra/electron-common',
    ];

    for (const name of packagesOrder) {
        const command = `npm run build --workspace ${name}`;
        child.execSync(command, { stdio: 'inherit' });
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
        // eslint-disable-next-line @typescript-eslint/naming-convention
        BABEL_ENV: compilationMode[flag],
        // eslint-disable-next-line @typescript-eslint/naming-convention
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
    const isVerbose = process.argv.includes('--verbose');

    const command = genCommand(
        'jest',
        '--config',
        paths.jestConfig,
        watch ? '--watch' : '--coverage',
        isVerbose && '--verbose',
    );

    const env = {
        ...process.env,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        BABEL_ENV: 'test',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NODE_ENV: 'test',
    };

    child.execSync(command, { env, stdio: 'inherit' });
}
