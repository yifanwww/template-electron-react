import child from 'child_process';
import electron from 'electron';

import { workingDir } from './constants';

child.spawn(electron as unknown as string, ['..'], { cwd: workingDir, stdio: 'inherit' });
