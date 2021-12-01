import { useEffect, useRef } from 'react';

import scss from './Frameless.module.scss';

export interface TitleBarProps {
    onClientAreaSizeChange?: (clientAreaSize: ClientAreaSize) => void;
}

export const TitleBar: React.FC<TitleBarProps> = (props) => {
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
};
