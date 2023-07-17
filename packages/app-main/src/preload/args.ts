import type { WindowType } from '@ter/app-common';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore `@types/yargs-parser` doesn't support this import path.
import _yargs from 'yargs-parser/browser';

const yargs = _yargs as typeof import('yargs-parser');

interface Arguments {
    windowType: WindowType;
}

export const webArgs = yargs(process.argv.slice(2)) as unknown as Arguments;
