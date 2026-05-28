import child from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { parse } from 'jsonc-parser';

export const root = path.resolve(import.meta.dirname, '..');

async function main() {
    const configRaw = await fs.readFile(path.join(root, 'electron-builder.json'), 'utf-8');
    /**
     * @type {import('electron-builder').Configuration}
     */
    const config = parse(configRaw);
    const { productName } = config;
    if (productName) {
        const binary = path.join(path.resolve(root, 'release/win-unpacked'), productName);
        child.spawn(binary, [], { cwd: root, stdio: 'inherit' });
    } else {
        console.error(chalk.red('Cannot find productName in electron-builder.json'));
    }
}

main();
