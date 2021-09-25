import chalk from 'chalk';
import child from 'child_process';

import { paths } from './paths';

export function buildPackages(): void {
    const packagesOrder = [
        '@tecra/assets',
        '@tecra/hooks',
        '@tecra/utils-fluentui',
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

    const command = ['webpack', '--config', paths.webpackMainConfig, '--mode', compilationMode[flag]].join(' ');

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

    const command = [
        'react-app-rewired',
        flag === 'dev' ? 'start' : 'build',
        '--config-overrides',
        paths.webpackRendererConfig,
        flag === 'build-profile' && '--profile',
    ]
        .filter(Boolean)
        .join(' ');

    console.info(chalk.yellow(command));
    child.execSync(command, { stdio: 'inherit' });
}
