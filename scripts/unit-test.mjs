import child from 'node:child_process';
import path from 'node:path';
import chalk from 'chalk';

const root = path.resolve(import.meta.dirname, '..');

function main() {
    const argv = process.argv.slice(2);

    const command = [
        'jest',
        '--config',
        path.resolve(root, './configs/jest/jest.config.mjs'),
        ...argv,
    ].join(' ');

    const env = {
        ...process.env,
        BABEL_ENV: 'test',
        NODE_ENV: 'test',
    };

    console.info(chalk.yellow(command));
    child.execSync(command, { env, stdio: 'inherit' });
}

main();
