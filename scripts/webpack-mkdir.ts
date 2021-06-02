import fs from 'fs';
import chalk from 'chalk';

import type { Compiler } from 'webpack';

module.exports = class WebpackMkdir {
    private _dir: string;

    public constructor(dir: string) {
        this._dir = dir;
    }

    public apply(compiler: Compiler) {
        compiler.hooks.done.tap('WebpackMkdir', () => this._mkdir());
    }

    private _info = (msg: string) => console.info(chalk.blackBright('[webpack-mkdir] ') + msg);

    private _mkdir = () => {
        try {
            fs.mkdirSync(this._dir);
            this._info(`Create directory "${this._dir}".`);
        } catch (err) {
            this._info(`Directory ${this._dir} exists.`);
        }
    };
};
