import { ReactElement, ReactNode, useCallback, useEffect } from 'react';

import { IClientAreaSize } from '#RUtils/GlobalTypes';

export interface IClientAreaSizeProviderProps {
    children: ReactNode;
    onClientAreaSizeChange: (clientAreaSize: IClientAreaSize) => void;
}

export function ClientAreaSizeProvider(props: Readonly<IClientAreaSizeProviderProps>): ReactElement {
    const { children, onClientAreaSizeChange } = props;

    const _onClientAreaSizeChange = useCallback(
        () => onClientAreaSizeChange({ height: window.innerHeight, width: window.innerWidth }),
        [onClientAreaSizeChange],
    );

    useEffect(() => {
        _onClientAreaSizeChange();

        window.addEventListener('resize', _onClientAreaSizeChange);

        return () => {
            window.removeEventListener('resize', _onClientAreaSizeChange);
        };
    }, [_onClientAreaSizeChange]);

    // TODO: Track the size of div.

    return <div>{children}</div>;
}
