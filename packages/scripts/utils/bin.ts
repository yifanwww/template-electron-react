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

type CompilationMode = 'build' | 'dev';

const compilationFlag = {
    build: 'production',
    dev: 'development',
};

export function electronMain(): void {
    const mode = process.argv[2] as CompilationMode;

    if (mode === undefined) {
        console.error(chalk.red('electron-main [mode]'));
        console.error(chalk.red('[mode] can be "build" or "dev"'));
        process.exit(1);
    } else if (mode !== 'build' && mode !== 'dev') {
        console.error(chalk.red(`Unknown argument "mode": ${mode}\n`));
        console.error(chalk.red('electron-main [mode]'));
        console.error(chalk.red('[mode] can only be "build" or "dev"'));
    }

    const command = ['webpack', '--config', paths.webpackMainConfig, '--mode', compilationFlag[mode]].join(' ');

    const env = {
        ...process.env,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        BABEL_ENV: compilationFlag[mode],
        // eslint-disable-next-line @typescript-eslint/naming-convention
        NODE_ENV: compilationFlag[mode],
    };

    child.execSync(command, { env, stdio: 'inherit' });
}
