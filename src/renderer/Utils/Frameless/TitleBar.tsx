import { ReactElement, useEffect, useRef } from 'react';

import scss from './Frameless.module.scss';

export interface ITitleBarProps {
    children?: ReactElement;
    onClientAreaSizeChange?: (clientAreaSize: IClientAreaSize) => void;
}

export function TitleBar(props: Readonly<ITitleBarProps>): ReactElement {
    const { children, onClientAreaSizeChange } = props;

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const changeClientAreaSize = () =>
            onClientAreaSizeChange?.({ height: ref.current!.clientHeight, width: ref.current!.clientWidth });

        changeClientAreaSize();

        window.addEventListener('resize', changeClientAreaSize);

        return () => {
            window.removeEventListener('resize', changeClientAreaSize);
        };
    }, [onClientAreaSizeChange]);

    return (
        <div id={scss.TitleBar} ref={ref}>
            {children}
        </div>
    );
}
