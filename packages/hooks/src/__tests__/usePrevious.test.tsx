import { render, RenderResult } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { usePrevious } from '../usePrevious';

interface IProps {
    value: string;
}

interface IRef {
    value: unknown;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function testMultiRerender(Component: React.FunctionComponent<IProps>, ref: IRef, rerender: RenderResult['rerender']) {
    rerender(<Component value="2" />);
    expect(ref.value).toBe('1');

    rerender(<Component value="2" />);
    expect(ref.value).toBe('2');

    rerender(<Component value="3" />);
    expect(ref.value).toBe('2');

    rerender(<Component value="4" />);
    expect(ref.value).toBe('3');
}

describe(`Test react hook \`${usePrevious.name}\``, () => {
    test('returns previous value', () => {
        const { rerender, result } = renderHook(usePrevious);
        expect(result.current).toBeUndefined();

        rerender(0);
        expect(result.current).toBeUndefined();

        rerender(1);
        expect(result.current).toBe(0);

        rerender(2);
        expect(result.current).toBe(1);
    });

    test('returns previous value, no initial value', () => {
        const ref: IRef = { value: undefined };
        function TestComponent({ value }: IProps) {
            ref.value = usePrevious(value);
            return <div />;
        }

        expect(ref.value).toBeUndefined();
        const { rerender } = render(<TestComponent value="1" />);
        expect(ref.value).toBeUndefined();

        testMultiRerender(TestComponent, ref, rerender);
    });

    test('returns previous value, with initial value `null`', () => {
        const ref: IRef = { value: undefined };
        function TestComponent({ value }: IProps) {
            ref.value = usePrevious(value, null);
            return <div />;
        }

        expect(ref.value).toBeUndefined();
        const { rerender } = render(<TestComponent value="1" />);
        expect(ref.value).toBeNull();

        testMultiRerender(TestComponent, ref, rerender);
    });

    test('returns previous value, with initial value of same type', () => {
        const ref: IRef = { value: undefined };
        function TestComponent({ value }: IProps) {
            ref.value = usePrevious(value, 'initial value');
            return <div />;
        }

        expect(ref.value).toBeUndefined();
        const { rerender } = render(<TestComponent value="1" />);
        expect(ref.value).toBe('initial value');

        testMultiRerender(TestComponent, ref, rerender);
    });
});
