import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const dirname = import.meta.dirname;

/**
 * @returns {import('jest').Config}
 */
function getConfig() {
    const testSetup = path.resolve(root, 'src/test-node.setup.ts');
    const hasTestSetup = fs.existsSync(testSetup);

    return {
        rootDir: root,
        roots: ['<rootDir>/src/main', '<rootDir>/src/shared'],
        cacheDirectory: path.resolve(root, './node_modules/.cache/jest'),

        setupFiles: [],
        setupFilesAfterEnv: hasTestSetup ? [testSetup] : [],

        coverageDirectory: path.resolve(root, './coverage/node'),
        collectCoverageFrom: [
            'src/**/*.ts',
            '!src/**/__mocks__/**/*.ts',
            '!src/**/__tests__/**/*.ts',
            '!src/**/*.{spec,test}.ts',
            '!src/**/*.d.ts',
        ],
        testMatch: ['<rootDir>/src/main/**/*.{spec,test}.ts', '<rootDir>/src/shared/**/*.{spec,test}.ts'],
        testEnvironment: 'node',

        transform: {
            '^.+\\.(js|mjs|cjs|ts)$': [
                '@swc/jest',
                {
                    jsc: {
                        parser: {
                            syntax: 'typescript',
                            decorators: false,
                            dynamicImport: true,
                        },
                        transform: {
                            legacyDecorator: false,
                            decoratorMetadata: false,
                            useDefineForClassFields: true,
                        },
                        target: 'es2020',
                    },
                    isModule: true,
                },
            ],
        },

        modulePaths: [],
        moduleNameMapper: {
            '^@main/(.*)$': '<rootDir>/src/main/$1',
            '^@preload/(.*)$': '<rootDir>/src/preload/$1',
            '^@renderer/(.*)$': '<rootDir>/src/renderer/$1',
            '^@shared/(.*)$': '<rootDir>/src/shared/$1',
            // Pure ESM packages needs this, to make the relative import works with TypeScript source files
            '^(.*)\\.js$': ['$1.js', '$1.ts'],
        },
        moduleFileExtensions: ['ts', 'js', 'json', 'node'],

        watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],

        // https://jestjs.io/docs/configuration/#resetmocks-boolean
        resetMocks: true,
        // https://jestjs.io/docs/configuration/#restoremocks-boolean
        restoreMocks: true,
    };
}

const config = getConfig();

export default config;
