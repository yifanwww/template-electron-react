import child from 'child_process';
import _electron from 'electron';

import { workingDir } from './constants';

const electron = _electron as unknown as string;

async function runApp(): Promise<void> {
    return new Promise((resolve) => {
        child.spawn(electron, ['..'], { cwd: workingDir, stdio: 'inherit' }).on('exit', resolve);
    });
}

runApp();
