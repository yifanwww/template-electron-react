import { getInitialState, _actions, _reducer } from './slice';

{
    const name = 'updateClientAreaSize';

    describe(`Test redux reducer \`${name}\``, () => {
        it('should update client area size', () => {
            const prevState = getInitialState();

            expect(_reducer(prevState, _actions[name]({ height: 123, width: 456 })).displayConfig).toMatchSnapshot();
        });
    });
}
