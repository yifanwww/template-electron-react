import child from 'child_process';

const packagesOrder: string[] = ['@tecra/assets'];

export function buildPackages(): void {
    for (const name of packagesOrder) {
        const command = `npm run build --workspace ${name}`;
        child.execSync(command, { stdio: 'inherit' });
    }
}
