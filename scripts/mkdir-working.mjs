import fs from 'node:fs/promises';
import { workingDir } from './locations.mjs';

async function main() {
    return fs
        .mkdir(workingDir)
        .then(() => console.info(`Create directory "${workingDir}"`))
        .catch(() => console.info(`Directory "${workingDir}" exists.`));
}

main();
