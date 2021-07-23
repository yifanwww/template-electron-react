import child from 'child_process';

import { unpackedApp, workingDir } from './constants';

child.spawn(unpackedApp, [], { cwd: workingDir, stdio: 'inherit' });
