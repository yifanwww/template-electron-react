import { createWorkingDir, executeElectron } from './utils.mjs';

async function main() {
    await createWorkingDir();
    return executeElectron(
        'cross-env YSoftwareTech_Template_Electron_Mode=Development electron ..',
    );
}

main();
