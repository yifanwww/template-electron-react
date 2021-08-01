import fs from 'fs';

import { workingDir } from './constants';

fs.promises
    .mkdir(workingDir)
    .then(() => console.info(`Create directory "${workingDir}".`))
    .catch(() => console.info(`Directory "${workingDir}" exists.`));
