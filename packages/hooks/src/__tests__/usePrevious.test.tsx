import { render, RenderResult } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { usePrevious } from '../usePrevious';

interface Props {
    value: string;
}

interface Ref {
    value: unknown;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
function testMultiRerender(Component: React.FunctionComponent<Props>, ref: Ref, rerender: RenderResult['rerender']) {
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
    it('returns previous value', () => {
        const { rerender, result } = renderHook(usePrevious);
        expect(result.current).toBeUndefined();

        rerender(0);
        expect(result.current).toBeUndefined();

        rerender(1);
        expect(result.current).toBe(0);

        rerender(2);
        expect(result.current).toBe(1);
    });

    it('returns previous value with no initial value', () => {
        const ref: Ref = { value: undefined };
        function TestComponent({ value }: Props) {
            ref.value = usePrevious(value);
            return <div />;
        }

        expect(ref.value).toBeUndefined();
        const { rerender } = render(<TestComponent value="1" />);
        expect(ref.value).toBeUndefined();

        testMultiRerender(TestComponent, ref, rerender);
    });

    it('returns previous value with initial value `null`', () => {
        const ref: Ref = { value: undefined };
        function TestComponent({ value }: Props) {
            ref.value = usePrevious(value, null);
            return <div />;
        }

        expect(ref.value).toBeUndefined();
        const { rerender } = render(<TestComponent value="1" />);
        expect(ref.value).toBeNull();

        testMultiRerender(TestComponent, ref, rerender);
    });

    it('returns previous value with initial value of the same type', () => {
        const ref: Ref = { value: undefined };
        function TestComponent({ value }: Props) {
            ref.value = usePrevious(value, 'initial value');
            return <div />;
        }

        expect(ref.value).toBeUndefined();
        const { rerender } = render(<TestComponent value="1" />);
        expect(ref.value).toBe('initial value');

        testMultiRerender(TestComponent, ref, rerender);
    });
});
