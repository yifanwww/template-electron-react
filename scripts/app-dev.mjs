import { createWorkingDir, executeElectron } from './utils.mjs';

async function main() {
    await createWorkingDir();
    return executeElectron('electron ..');
}

main();
