import { ReactElement, ReactNode, useCallback, useEffect, useRef } from 'react';

import { IClientAreaSize } from '#RUtils/GlobalTypes';

import './ClientAreaProvider.css';

export interface IClientAreaProviderProps {
    children?: ReactNode;
    onClientAreaSizeChange?: (clientAreaSize: IClientAreaSize) => void;
}

export function ClientAreaProvider(props: Readonly<IClientAreaProviderProps>): ReactElement {
    const { children, onClientAreaSizeChange } = props;

    const ref = useRef<HTMLDivElement>(null);

    const _onClientAreaSizeChange = useCallback(
        () => onClientAreaSizeChange?.({ height: ref.current!.clientHeight, width: ref.current!.clientWidth }),
        [onClientAreaSizeChange],
    );

    useEffect(() => {
        _onClientAreaSizeChange();

        window.addEventListener('resize', _onClientAreaSizeChange);

        return () => {
            window.removeEventListener('resize', _onClientAreaSizeChange);
        };
    }, [_onClientAreaSizeChange]);

    return (
        <div id="ClientAreaProvider" ref={ref}>
            {children}
        </div>
    );
}
