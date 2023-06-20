import type { Config } from '@jest/types';
import fs from 'node:fs';
import path from 'node:path';

import { paths } from '../utils';

function getConfig(): Config.InitialOptions {
    const packageJson = process.env.npm_package_json;
    const packageDir = packageJson ? path.dirname(packageJson) : process.cwd();

    const packageOwnTestSetup = path.resolve(packageDir, 'src/test.setup.ts');
    const hasPackageOwnTestSetup = fs.existsSync(packageOwnTestSetup);

    return {
        rootDir: packageDir,
        roots: ['<rootDir>/src'],
        cacheDirectory: paths.jestCache,

        setupFiles: [require.resolve('react-app-polyfill/jsdom')],
        setupFilesAfterEnv: hasPackageOwnTestSetup ? [packageOwnTestSetup] : [],

        collectCoverageFrom: [
            'src/**/*.{ts,tsx}',
            '!src/**/__tests__/**/*.{ts,tsx}',
            '!src/**/*.{spec.test}.{ts,tsx}',
            '!src/**/*.d.ts',
            '!src/setup.test.ts',
        ],
        testMatch: ['<rootDir>/src/**/*.{spec,test}.{ts,tsx}'],
        testEnvironment: 'jest-environment-jsdom',

        transform: {
            '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': paths.transforms.babel,
            '^.+\\.css$': paths.transforms.css,
            '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': paths.transforms.file,
        },
        transformIgnorePatterns: [
            '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
            '^.+\\.module\\.(css|sass|scss)$',
        ],

        modulePaths: [],
        moduleNameMapper: {
            '^react-native$': 'react-native-web',
            '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
            '^src/(.*)$': '<rootDir>/src/$1',
        },
        moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx', 'web.js', 'web.jsx', 'web.ts', 'web.tsx'],

        watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],

        // https://jestjs.io/docs/configuration/#resetmocks-boolean
        resetMocks: true,
        // https://jestjs.io/docs/configuration/#restoremocks-boolean
        restoreMocks: true,
    };
}

export = getConfig();
