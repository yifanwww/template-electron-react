module.exports = {
    rootDir: process.cwd(),
    roots: ['<rootDir>/src/main', '<rootDir>/src/utils'],
    testRegex: 'test/(.+)\\.test\\.ts$',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testEnvironment: 'node',
    collectCoverage: false,
    moduleFileExtensions: ['js', 'ts'],
    globals: {
        // ts-jest configuration goes here.
        'ts-jest': {
            tsConfig: '<rootDir>/config/tsconfig.main.json'
        }
    }
}
