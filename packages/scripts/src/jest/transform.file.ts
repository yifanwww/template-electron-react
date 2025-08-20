import camelcase from 'camelcase';
import path from 'node:path';

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html

export default {
    process(src: string, filename: string) {
        const assetFilename = JSON.stringify(path.basename(filename));

        if (/\.svg$/.exec(filename)) {
            // Based on how SVGR generates a component name:
            // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
            const pascalCaseFilename = camelcase(path.parse(filename).name, {
                pascalCase: true,
            });
            const componentName = `Svg${pascalCaseFilename}`;
            return {
                code: `
const React = require('react');
module.exports = {
    __esModule: true,
    default: ${assetFilename},
    ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
        return {
            $$typeof: Symbol.for('react.element'),
            type: 'svg',
            ref,
            key: null,
            props: { ...props, children: ${assetFilename} },
        };
    }),
};
`.trim(),
            };
        }

        return {
            code: `module.exports = ${assetFilename};`,
        };
    },
};
