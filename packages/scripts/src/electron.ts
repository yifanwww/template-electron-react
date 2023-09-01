import fs from 'node:fs';
import { createRequire } from 'node:module';
import semver from 'semver';

const _require = createRequire(import.meta.url);

function getElectronMajorVer(): number {
    const pkg = _require.resolve('electron/package.json');

    if (!fs.existsSync(pkg)) {
        throw new Error('cannot resolve electron package.json');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const version = _require(pkg).version as string;
    const majorVer = semver.major(version);
    return majorVer;
}

export function getElectronNodeTarget(): string {
    const electronVer = getElectronMajorVer();

    const nodeVer: Record<string, string | undefined> = {
        '26': '18.16',
        '25': '18.15',
        '24': '18.14',
        '23': '18.12',
        '22': '16.17',
        '21': '16.16',
        '20': '16.15',
        '19': '16.14',
        '18': '16.13',
        '17': '16.13',
        '16': '16.9',
        '15': '16.5',
        '14': '14.17',
        '13': '14.17',
        '12': '14.16',
        '11': '12.18',
    };
    if (electronVer > 10) {
        let target = nodeVer[electronVer];
        if (!target) target = Object.values(nodeVer).reverse()[0];
        return `node${target}`;
    }
    return '';
}

export function getElectronChromeTarget(): string {
    const electronVer = getElectronMajorVer();

    const chromeVer: Record<string, string | undefined> = {
        '27': '118',
        '26': '116',
        '25': '114',
        '24': '112',
        '23': '110',
        '22': '108',
        '21': '106',
        '20': '104',
        '19': '102',
        '18': '100',
        '17': '98',
        '16': '96',
        '15': '94',
        '14': '93',
        '13': '91',
        '12': '89',
        '11': '87',
    };
    if (electronVer > 10) {
        let target = chromeVer[electronVer];
        if (!target) target = Object.values(chromeVer).reverse()[0];
        return `chrome${target}`;
    }
    return '';
}
