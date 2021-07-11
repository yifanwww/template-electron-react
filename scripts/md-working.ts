import fs from 'fs';

import { workingDir } from './constants';

async function mdWorking(): Promise<void> {
    try {
        await fs.promises.mkdir(workingDir);
        console.info(`Create directory "${workingDir}".`);
    } catch (error) {
        console.info(`Directory "${workingDir}" exists.`);
    }
}

mdWorking();
