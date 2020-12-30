const _child = require('child_process');
const _electron = require('electron');
const _chalk = require('chalk');

module.exports = class WebpackElectronReload {
    constructor(projectDir, cwd) {
        this._cwd = cwd;
        this._projectDir = projectDir;
        this._process = null;

        this._info(`Found electron at "${_electron}"`);
    }

    apply(compiler) {
        let server = false;
        compiler.hooks.done.tap('WebpackElectronReload', () => {
            if (!server) {
                server = true;
                this._start();
            } else {
                this._restart();
            }
        });
    }

    _info = (msg) => console.info(_chalk.blackBright('[webpack-electron-reload] ') + msg);

    _spawn() {
        this._process = _child.spawn(_electron, [this._projectDir], {
            cwd: this._cwd,
            stdio: 'inherit',
        });
        this._process.on('exit', () => (this._process = null));

        this._info(`Started electron process: ${this._process.pid}`);
    }

    _start() {
        this._info('Spawning electron process.');
        this._spawn();
    }

    _restart() {
        if (this._process) {
            this._info(`Kill electron process: ${this._process.pid}`);
            try {
                this._process.removeAllListeners();
                process.kill(this._process.pid);
                this._process = null;
            } catch (err) {
                console.error(err);
            }
        }

        this._info('Respawning electron process.');
        this._spawn();
    }
};
