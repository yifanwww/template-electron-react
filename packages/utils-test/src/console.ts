import type { ConditionalKeys } from 'type-fest';

function spyOn(method: ConditionalKeys<Console, UnknownFn>) {
    jest.spyOn(console, method).mockImplementation((...messages) => {
        expect({ console: method, messages }).toMatchSnapshot();
    });
}

export const mockConsoleToMatchSnapshot = () => {
    spyOn('debug');
    spyOn('error');
    spyOn('info');
    spyOn('log');
    spyOn('warn');
};
