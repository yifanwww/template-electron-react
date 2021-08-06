import { ReactElement, useRef } from 'react';

import { Keyboard, KeyboardEventType, useKey, UseKeyHandler } from '../../Hooks';

import scss from './KeyboardCaptor.module.scss';

export type KeyboardCaptorHandler = UseKeyHandler;

export interface IKeyboardCaptorProps {
    children?: ReactElement;
    targetKey?: Keyboard;
    type: KeyboardEventType;
    handler: KeyboardCaptorHandler;
}

export function KeyboardCaptor(props: Readonly<IKeyboardCaptorProps>): ReactElement {
    const { children, handler, targetKey, type } = props;

    const ref = useRef<HTMLDivElement>(null);

    if (targetKey) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useKey(ref.current, type, targetKey, handler);
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useKey(ref.current, type, handler);
    }

    return (
        <div className={scss.KeyboardCaptor} ref={ref}>
            {children}
        </div>
    );
}
