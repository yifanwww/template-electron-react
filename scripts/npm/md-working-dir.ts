import fs from 'fs';

import { paths } from '../paths';

fs.promises
    .mkdir(paths.working)
    .then(() => console.info(`Create directory "${paths.working}".`))
    .catch(() => console.info(`Directory "${paths.working}" exists.`));
