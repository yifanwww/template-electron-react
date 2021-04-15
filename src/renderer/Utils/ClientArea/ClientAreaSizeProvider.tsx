import { ReactElement, ReactNode, useCallback, useEffect, useRef } from 'react';

import { IClientAreaSize } from '#RUtils/GlobalTypes';

import './ClientAreaSizeProvider.css';

export interface IClientAreaSizeProviderProps {
    children: ReactNode;
    onClientAreaSizeChange: (clientAreaSize: IClientAreaSize) => void;
}

export function ClientAreaSizeProvider(props: Readonly<IClientAreaSizeProviderProps>): ReactElement {
    const { children, onClientAreaSizeChange } = props;

    const ref = useRef<HTMLDivElement>(null);

    const _onClientAreaSizeChange = useCallback(
        () => onClientAreaSizeChange({ height: ref.current!.clientHeight, width: ref.current!.clientWidth }),
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
        <div id="ClientAreaSizeProvider" ref={ref}>
            {children}
        </div>
    );
}
