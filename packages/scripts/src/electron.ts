import fs from 'node:fs';
import url from 'node:url';
import semver from 'semver';

const resolve = (p: string) => url.fileURLToPath(import.meta.resolve(p));

function getElectronMajorVer(): number {
    const pkg = resolve('electron/package.json');

    if (!fs.existsSync(pkg)) {
        throw new Error('cannot resolve electron package.json');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const version = JSON.parse(fs.readFileSync(pkg, 'utf-8')).version as string;
    const majorVer = semver.major(version);
    return majorVer;
}

export function getElectronChromeTarget(): string {
    const electronVer = getElectronMajorVer();

    const chromeVer: Record<string, string | undefined> = {
        '40': '144',
        '39': '142',
        '38': '140',
        '37': '138',
        '36': '136',
        '35': '134',
        '34': '132',
        '33': '130',
        '32': '128',
        '31': '126',
        '30': '124',
        '29': '122',
        '28': '120',
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
        target ??= Object.values(chromeVer).reverse()[0];
        return `chrome${target}`;
    }
    return '';
}
