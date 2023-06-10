import chalk from 'chalk';
import _electron from 'electron';
import child from 'node:child_process';
import type { Compiler } from 'webpack';

const electron = _electron as unknown as string;

export class ReloadElectronWebpackPlugin {
    private _cwd: string;
    private _projectDir: string;
    private _process: child.ChildProcess | null;

    constructor(projectDir: string, cwd: string) {
        this._cwd = cwd;
        this._projectDir = projectDir;
        this._process = null;

        this._info(`Found electron at "${electron}"`);
    }

    apply = (compiler: Compiler) => {
        let server = false;
        compiler.hooks.done.tap('ReloadElectronWebpackPlugin', () => {
            if (!server) {
                server = true;
                this._start();
            } else {
                this._restart();
            }
        });
    };

    private _info = (msg: string) => console.info(chalk.blackBright('[reload-electron-webpack-plugin] ') + msg);

    private _spawn = () => {
        this._process = child
            .spawn(electron, [this._projectDir], {
                cwd: this._cwd,
                stdio: 'inherit',
            })
            .on('exit', () => {
                this._process = null;
            });

        this._info(`Started electron process: ${this._process.pid}`);
    };

    private _start = () => {
        this._info('Spawning electron process.');
        this._spawn();
    };

    private _restart = () => {
        if (this._process) {
            this._info(`Kill electron process: ${this._process.pid}`);
            try {
                this._process.removeAllListeners();
                process.kill(this._process.pid!);
                this._process = null;
            } catch (err) {
                console.error(err);
            }
        }

        this._info('Respawning electron process.');
        this._spawn();
    };
}
