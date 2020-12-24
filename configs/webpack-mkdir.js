const _fs = require('fs');
const _chalk = require('chalk');

module.exports = class WebpackMkdir {
    constructor(dir) {
        this._dir = dir;
    }

    apply(compiler) {
        compiler.hooks.done.tap('WebpackMkdir', () => {
            this._mkdir();
        });
    }

    _info = (msg) => console.info(_chalk.blackBright('[webpack-mkdir] ') + msg);

    _mkdir() {
        try {
            _fs.mkdirSync(this._dir);
            this._info(`Create directory "${this._dir}".`);
        } catch (err) {
            this._info(`Directory ${this._dir} exists.`);
        }
    }
};
