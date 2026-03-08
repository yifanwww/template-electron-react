import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const dirname = import.meta.dirname;

/**
 * @returns {import('jest').Config}
 */
function getConfig() {
    const packageJson = process.env.npm_package_json;
    const packageDir = packageJson ? path.dirname(packageJson) : process.cwd();

    const packageOwnTestSetup = path.resolve(packageDir, 'src/test.setup.ts');
    const hasPackageOwnTestSetup = fs.existsSync(packageOwnTestSetup);

    return {
        rootDir: packageDir,
        roots: ['<rootDir>/src'],
        cacheDirectory: path.resolve(root, './node_modules/.cache/jest'),

        setupFiles: [path.resolve(dirname, './jest.setup.mjs')],
        setupFilesAfterEnv: hasPackageOwnTestSetup ? [packageOwnTestSetup] : [],

        collectCoverageFrom: [
            'src/**/*.{ts,tsx}',
            '!src/**/__mocks__/**/*.{ts,tsx}',
            '!src/**/__tests__/**/*.{ts,tsx}',
            '!src/**/*.{spec.test}.{ts,tsx}',
            '!src/**/*.d.ts',
            '!src/test.setup.ts',
        ],
        testMatch: ['<rootDir>/src/**/*.{spec,test}.{ts,tsx}'],
        testEnvironment: 'jest-environment-jsdom',

        transform: {
            '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': [
                '@swc/jest',
                {
                    jsc: {
                        transform: {
                            react: { runtime: 'automatic' },
                            useDefineForClassFields: true,
                        },
                    },
                    isModule: true,
                },
            ],
            '^.+\\.css$': path.resolve(dirname, './transform.css.mjs'),
            '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': path.resolve(dirname, './transform.file.mjs'),
        },
        transformIgnorePatterns: [
            '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
            '^.+\\.module\\.(css|sass|scss)$',
        ],

        modulePaths: [],
        moduleNameMapper: {
            '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
            '^src/(.*)$': '<rootDir>/src/$1',
            '^(.*)\\.js$': ['$1.js', '$1.ts'],
        },
        moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js', 'json', 'node'],

        watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],

        // https://jestjs.io/docs/configuration/#resetmocks-boolean
        resetMocks: true,
        // https://jestjs.io/docs/configuration/#restoremocks-boolean
        restoreMocks: true,
    };
}

const config = getConfig();

export default config;
