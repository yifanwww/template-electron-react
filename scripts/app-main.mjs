import assert from 'node:assert';
import child from 'node:child_process';
import path from 'node:path';
import chalk from 'chalk';
import { root } from './locations.mjs';

function main() {
    /**
     * @type {'build' | 'dev'}
     */
    const flag = process.argv[2];

    assert(flag === 'build' || flag === 'dev');

    const command = [
        'webpack',
        '--config',
        path.resolve(root, './configs/webpack/webpack.main.config.mjs'),
        '--mode',
        flag === 'build' ? 'production' : 'development',
    ].join(' ');

    console.info(chalk.yellow(command));
    child.execSync(command, { stdio: 'inherit' });
}

main();
