import { initializeIcons } from '@fluentui/react';
import path from 'path';
import renderer from 'react-test-renderer';

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

function wrapConsole() {
    type Output = (...data: unknown[]) => void;

    function outputFactory(outputImpl: Output): Output {
        const filter = __dirname.split(path.sep).slice(-4, -2).join(path.sep);

        const output: Output = (...data) => {
            const obj = {};
            Error.captureStackTrace(obj, output);
            // @ts-ignore
            const { stack } = obj;

            if (!stack.split('\n')[1].includes(filter)) {
                outputImpl(...data);
            }
        };

        return output;
    }

    console.testError = console.error;
    console.testInfo = console.info;
    console.testWarn = console.warn;

    console.debug = outputFactory(console.debug);
    console.error = outputFactory(console.error);
    console.info = outputFactory(console.info);
    console.log = outputFactory(console.log);
    console.warn = outputFactory(console.warn);
}

function setupJestGlobalFunctions(): void {
    global.expectSnapshot = (actual) => expect(actual).toMatchSnapshot();
    global.expectElementSnapshot = (element) => expect(renderer.create(element).toJSON()).toMatchSnapshot();
}

function setupJest(): void {
    initializeIcons();

    wrapConsole();

    setupJestGlobalFunctions();
}

setupJest();
