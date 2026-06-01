import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const dirname = import.meta.dirname;

/**
 * @returns {import('jest').Config}
 */
function getConfig() {
    const testSetup = path.resolve(root, 'src/test-jsdom.setup.ts');
    const hasTestSetup = fs.existsSync(testSetup);

    return {
        rootDir: root,
        roots: ['<rootDir>/src/renderer'],
        cacheDirectory: path.resolve(root, './node_modules/.cache/jest'),

        setupFiles: [path.resolve(dirname, './jest.setup.mjs')],
        setupFilesAfterEnv: hasTestSetup ? [testSetup] : [],

        coverageDirectory: path.resolve(root, './coverage/jsdom'),
        collectCoverageFrom: [
            'src/**/*.{ts,tsx}',
            '!src/**/__mocks__/**/*.{ts,tsx}',
            '!src/**/__tests__/**/*.{ts,tsx}',
            '!src/**/*.{spec,test}.{ts,tsx}',
            '!src/**/*.d.ts',
        ],
        testMatch: ['<rootDir>/src/renderer/**/*.{spec,test}.{ts,tsx}'],
        testEnvironment: 'jsdom',

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
        transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$', '^.+\\.module\\.(css|sass|scss)$'],

        modulePaths: [],
        moduleNameMapper: {
            '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
            '^@main/(.*)$': '<rootDir>/src/main/$1',
            '^@preload/(.*)$': '<rootDir>/src/preload/$1',
            '^@renderer/(.*)$': '<rootDir>/src/renderer/$1',
            '^@shared/(.*)$': '<rootDir>/src/shared/$1',
            // Pure ESM packages needs this, to make the relative import works with TypeScript source files
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
