import { Config } from '@jest/types';
import path from 'path';

import { paths } from '../utils';

const packageJson = process.env.npm_package_json;

const config: Config.InitialOptions = {
    rootDir: packageJson ? path.dirname(packageJson) : process.cwd(),
    roots: ['<rootDir>/src'],

    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],

    setupFiles: [require.resolve('react-app-polyfill/jsdom')],
    setupFilesAfterEnv: [paths.testSetup],

    testMatch: ['<rootDir>/src/**/__tests__/**/*.{ts,tsx}', '<rootDir>/src/**/*.{spec,test}.{ts,tsx}'],
    testEnvironment: 'jsdom',
    testRunner: require.resolve('jest-circus/runner'),

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

    resetMocks: true,
};

export = config;
