import child from 'child_process';

import { paths } from '../paths';

child.spawn(paths.unpacked, [], { cwd: paths.working, stdio: 'inherit' });
