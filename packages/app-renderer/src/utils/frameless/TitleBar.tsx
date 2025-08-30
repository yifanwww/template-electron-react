import { useEffect, useRef } from 'react';

import type { ClientAreaSize } from 'src/types/electron';

import css from './Frameless.module.scss';

export interface TitleBarProps {
    onClientAreaSizeChange?: (clientAreaSize: ClientAreaSize) => void;
}

export function TitleBar(props: React.PropsWithChildren<TitleBarProps>): React.ReactNode {
    const { children, onClientAreaSizeChange } = props;

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const changeClientAreaSize = () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onClientAreaSizeChange?.({ height: ref.current!.clientHeight, width: ref.current!.clientWidth });
        };

        changeClientAreaSize();

        window.addEventListener('resize', changeClientAreaSize);

        return () => {
            window.removeEventListener('resize', changeClientAreaSize);
        };
    }, [onClientAreaSizeChange]);

    return (
        <div id={css['title-bar']} ref={ref}>
            {children}
        </div>
    );
}
