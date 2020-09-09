const path = require("path");

module.exports = {
    rootDir: path.join(__dirname, ".."),
    roots: ["<rootDir>/src/main", "<rootDir>/src/utils"],
    testRegex: "test/(.+)\\.test\\.ts$",
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
    testPathIgnorePatterns: [
        "/node_modules/"
    ],
    testEnvironment: "node",
    collectCoverage: false,
    moduleFileExtensions: ["js", "ts"],
    globals: {
        // ts-jest configuration goes here.
        "ts-jest": {
            tsConfig: "<rootDir>/configs/tsconfig.main.json"
        }
    }
}