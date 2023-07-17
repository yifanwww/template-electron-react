import fs from 'node:fs';
import semver from 'semver';

function getElectronMajorVer(): number {
    const pkg = require.resolve('electron/package.json');

    if (!fs.existsSync(pkg)) {
        throw new Error('cannot resolve electron package.json');
    }

    // eslint-disable-next-line
    const version = require(pkg).version as string;
    const majorVer = semver.major(version);
    return majorVer;
}

export function getElectronChromeTarget(): string {
    const electronVer = getElectronMajorVer();

    const chromeVer: Record<string, string | undefined> = {
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
