import { ReactElement, useCallback, useEffect, useRef } from 'react';

import { IClientAreaSize } from '#RUtils/Types';

import scss from './Frameless.module.scss';

export interface ITitleBarProps {
    children?: ReactElement;
    onClientAreaSizeChange?: (clientAreaSize: IClientAreaSize) => void;
}

export function TitleBar(props: Readonly<ITitleBarProps>): ReactElement {
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
        <div id={scss.TitleBar} ref={ref}>
            {children}
        </div>
    );
}
