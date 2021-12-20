import { expectSnapshot } from './utils';

export const mockConsoleToMatchSnapshot = () => {
    jest.spyOn(console, 'debug').mockImplementation((...messages) => expectSnapshot({ console: 'debug', messages }));
    jest.spyOn(console, 'error').mockImplementation((...messages) => expectSnapshot({ console: 'error', messages }));
    jest.spyOn(console, 'info').mockImplementation((...messages) => expectSnapshot({ console: 'info', messages }));
    jest.spyOn(console, 'log').mockImplementation((...messages) => expectSnapshot({ console: 'log', messages }));
    jest.spyOn(console, 'warn').mockImplementation((...messages) => expectSnapshot({ console: 'warn', messages }));
};
