import _chalk from 'chalk';
import _fs from 'fs';
import _lodash from 'lodash-es';

/** @param {string} configFile */
async function getConfigContent(configFile) {
    const content = await _fs.promises.readFile(configFile, { encoding: 'utf-8' });
    return content.trim().replace(/\r\n/g, '\n');
}

/** @param {string} content */
function analyzeConfigs(content) {
    /**
     * @param {string[]} lines
     * @param {number} i
     */
    function getProperties(lines, i) {
        const properties = {};

        for (let j = i; j < lines.length; j++) {
            const line = lines[j].trim();

            if (line[0] === '[') break;

            const index = line.indexOf(' = ');
            const key = line.slice(0, index);
            const value = line.slice(index + 3);
            properties[key] = value;
        }

        return properties;
    }

    const configs = {};

    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line[0] === '[') {
            if (!line.includes('"')) {
                const title = line.slice(1, -1);
                configs[title] = getProperties(lines, i + 1);
            } else {
                const splits = line.split('"');
                const title = splits[0].slice(1).trim();
                const subtitle = splits[1].trim();

                if (configs[title] === undefined) {
                    configs[title] = {};
                }

                configs[title][subtitle] = getProperties(lines, i + 1);
            }
        }
    }

    return configs;
}

/** @param {{}} configs */
function convertConfigsToString(configs) {
    /**
     * @param {string} title
     * @param {{}} properties
     */
    function convertProperties(title, properties) {
        const lines = [];

        // subtitle

        for (const subtitle in properties) {
            const subproperties = properties[subtitle];
            if (typeof subproperties === 'object') {
                lines.push(`[${title} "${subtitle}"]`);

                for (const key in subproperties) {
                    const value = subproperties[key];
                    lines.push(`\t${key} = ${value}`);
                }
            }
        }

        // non-subtitle

        const titleLine = `[${title}]`;
        const titleProperties = [];
        for (const key in properties) {
            if (typeof properties[key] === 'string') {
                const value = properties[key];
                titleProperties.push(`\t${key} = ${value}`);
            }
        }

        if (titleProperties.length > 0) {
            lines.push(titleLine);
            lines.push(...titleProperties);
        }

        return lines;
    }

    const lines = [];
    for (const title in configs) {
        lines.push(...convertProperties(title, configs[title]));
    }
    return lines.join('\n');
}

async function main() {
    const configFile = '.git/config';

    const customConfigs = {
        pull: {
            ff: 'only',
        },
    };
    // prettier-ignore
    const infos = 
`
- Set pull.ff to 'only'
  When you try to execute 'git pull', if git finds out that it cannot do
  'merge' in fast-forward mode after 'fetch', git will abort 'pull'.
  You need to use 'git rebase' manually to move your local changes to the top
  of the remote changes. Or you can use 'git merge', but not recommended.
`.trim();

    const originalContent = await getConfigContent(configFile);
    const configs = analyzeConfigs(originalContent);
    const mergedConfigs = _lodash.merge({}, configs, customConfigs);

    if (JSON.stringify(configs) === JSON.stringify(mergedConfigs)) {
        console.info(_chalk.grey("No need to change '.git/config'"));
    } else {
        const newContent = convertConfigsToString(mergedConfigs);

        console.info(_chalk.blue("Update '.git/config' to add or change some configs."));
        console.info(_chalk.yellow('--- original local git config ---'));
        console.info(originalContent);
        console.info(_chalk.yellow('--- new local git config ---'));
        console.info(newContent);
        console.info(_chalk.yellow('--- the reason why git configs will be changed ---'));
        console.info(infos);

        await _fs.promises.writeFile(configFile, newContent + '\n');
    }
}

main();
