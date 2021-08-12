import child from 'child_process';

import { paths } from '../paths';

child.spawn(paths.electron, ['..'], { cwd: paths.working, stdio: 'inherit' });
