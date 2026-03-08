import child from 'node:child_process';
import chalk from 'chalk';
import _electron from 'electron';

/** @type {string} */
const electron = _electron;

export class ReloadElectronWebpackPlugin {
    #cwd;
    #projectDir;
    #process;

    /**
     * @param {string} projectDir
     * @param {string} cwd
     */
    constructor(projectDir, cwd) {
        this.#cwd = cwd;
        this.#projectDir = projectDir;
        this.#process = null;

        this.#info(`Found electron at "${electron}"`);
    }

    /**
     * @param {import('webpack').Compiler} compiler
     */
    apply(compiler) {
        let server = false;
        compiler.hooks.done.tap('ReloadElectronWebpackPlugin', () => {
            if (!server) {
                server = true;
                this.#start();
            } else {
                this.#restart();
            }
        });
    }

    #info(msg) {
        console.info(chalk.blackBright('[reload-electron-webpack-plugin] ') + msg);
    }

    #spawn() {
        this.#process = child
            .spawn(electron, [this.#projectDir], {
                cwd: this.#cwd,
                stdio: 'inherit',
            })
            .on('exit', () => {
                this.#process = null;
            });

        this.#info(`Started electron process: ${this.#process.pid}`);
    }

    #start() {
        this.#info('Spawning electron process.');
        this.#spawn();
    }

    #restart() {
        if (this.#process) {
            this.#info(`Kill electron process: ${this.#process.pid}`);
            try {
                this.#process.removeAllListeners();
                process.kill(this.#process.pid);
                this.#process = null;
            } catch (err) {
                console.error(err);
            }
        }

        this.#info('Respawning electron process.');
        this.#spawn();
    }
}
