import { useCallback, useEffect } from 'react';

export enum Keyboard {
    KeyA = 0, // A-Z Or a-z
    KeyB,
    KeyC,
    KeyD,
    KeyE,
    KeyF,
    KeyG,
    KeyH,
    KeyI,
    KeyJ,
    KeyK,
    KeyL,
    KeyM,
    KeyN,
    KeyO,
    KeyP,
    KeyQ,
    KeyR,
    KeyS,
    KeyT,
    KeyU,
    KeyV,
    KeyW,
    KeyX,
    KeyY,
    KeyZ,
    A = 30, // A-Z
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X,
    Y,
    Z,
    a = 60, // a-z
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    k,
    l,
    m,
    n,
    o,
    p,
    q,
    r,
    s,
    t,
    u,
    v,
    w,
    x,
    y,
    z,
    Num0 = 90, // 0-9
    Num1,
    Num2,
    Num3,
    Num4,
    Num5,
    Num6,
    Num7,
    Num8,
    Num9,
    Digit0 = 100, // 0-9 Not In Numpad
    Digit1,
    Digit2,
    Digit3,
    Digit4,
    Digit5,
    Digit6,
    Digit7,
    Digit8,
    Digit9,
    Numpad0 = 110, // 0-9 In Numpad
    Numpad1,
    Numpad2,
    Numpad3,
    Numpad4,
    Numpad5,
    Numpad6,
    Numpad7,
    Numpad8,
    Numpad9,
    Add = 150, // Special Key
    Decimal,
    Divide,
    Multiply,
    Subtract,
    NumpadAdd,
    NumpadDecimal,
    NumpadDivide,
    NumpadMultiply,
    NumpadSubtract,
    Backquote,
    Backslash,
    BracketLeft,
    BracketRight,
    Comma,
    Equal,
    Minus,
    Period,
    Quote,
    Semicolon,
    Slash,
    Space,
    ArrowDown = 200, // Control Key
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    Alt,
    AltLeft,
    AltRight,
    Backspace,
    CapsLock,
    Ctrl,
    CtrlLeft,
    CtrlRight,
    Delete,
    End,
    Enter,
    Home,
    NumLock,
    NumpadEnter,
    PageDown,
    PageUp,
    Shift,
    ShiftLeft,
    ShiftRight,
    Tab,
    CtrlTab = 250, // Key Conbination
}

type Checker = (event: KeyboardEvent, key: Keyboard) => boolean;

const checkKeyCombination = (event: KeyboardEvent) => event.altKey || event.ctrlKey || event.metaKey;

const checkChar: Checker = (event, key) =>
    !checkKeyCombination(event) && event.code === `Key${String.fromCharCode(65 + key - Keyboard.KeyA)}`;

const checkUpperCaseChar: Checker = (event, key) =>
    !checkKeyCombination(event) && event.key === String.fromCharCode(65 + key - Keyboard.A);

const checkLowerCaseChar: Checker = (event, key) =>
    !checkKeyCombination(event) && event.key === String.fromCharCode(97 + key - Keyboard.a);

const checkNum: Checker = (event, key) => !checkKeyCombination(event) && event.key === (key - Keyboard.Num0).toString();

const checkDigitNum: Checker = (event, key) =>
    !checkKeyCombination(event) && event.code === `Digit${key - Keyboard.Digit0}`;

const checkNumpadNum: Checker = (event, key) =>
    !checkKeyCombination(event) && event.code === `Numpad${key - Keyboard.Numpad0}`;

const checkSpecialKeys: Checker = (event, key) => {
    if (checkKeyCombination(event)) return false;

    if (key >= Keyboard.Add && key <= Keyboard.Subtract) {
        if (key === Keyboard.Add) return event.key === '+';
        else if (key === Keyboard.Decimal) return event.key === '.';
        else if (key === Keyboard.Divide) return event.key === '/';
        else if (key === Keyboard.Multiply) return event.key === '*';
        else if (key === Keyboard.Subtract) return event.key === '-';
    } else if (key >= Keyboard.NumpadAdd && key <= Keyboard.NumpadSubtract) {
        if (key === Keyboard.NumpadAdd) return event.key === 'NumpadAdd';
        else if (key === Keyboard.NumpadDecimal) return event.key === 'NumpadDecimal';
        else if (key === Keyboard.NumpadDivide) return event.key === 'NumpadDivide';
        else if (key === Keyboard.NumpadMultiply) return event.key === 'NumpadMultiply';
        else if (key === Keyboard.NumpadSubtract) return event.key === 'NumpadSubtract';
    } else {
        // eslint-disable-next-line no-lonely-if
        if (key === Keyboard.Backquote) return event.key === '`';
        else if (key === Keyboard.Backslash) return event.key === '\\';
        else if (key === Keyboard.BracketLeft) return event.key === '[';
        else if (key === Keyboard.BracketRight) return event.key === ']';
        else if (key === Keyboard.Comma) return event.key === ',';
        else if (key === Keyboard.Equal) return event.key === '=';
        else if (key === Keyboard.Minus) return event.key === '-';
        else if (key === Keyboard.Period) return event.key === '.';
        else if (key === Keyboard.Quote) return event.key === "'";
        else if (key === Keyboard.Semicolon) return event.key === ',';
        else if (key === Keyboard.Slash) return event.key === '/';
        else if (key === Keyboard.Space) return event.key === ' ';
    }

    // Never run to here
    console.error('Error in checking special keys.');
    return false;
};

const checkControlKeys: Checker = (event, key) => {
    if (checkKeyCombination(event)) return false;

    switch (key) {
        case Keyboard.ArrowDown:
            return event.key === 'ArrowDown';
        case Keyboard.ArrowLeft:
            return event.key === 'ArrowLeft';
        case Keyboard.ArrowRight:
            return event.key === 'ArrowRight';
        case Keyboard.ArrowUp:
            return event.key === 'ArrowUp';
        case Keyboard.Alt:
            return event.key === 'ArrowUp';
        case Keyboard.AltLeft:
            return event.code === 'AltLeft';
        case Keyboard.AltRight:
            return event.code === 'AltRight';
        case Keyboard.Backspace:
            return event.key === 'Backspace';
        case Keyboard.CapsLock:
            return event.key === 'CapsLock';
        case Keyboard.Ctrl:
            return event.key === 'Control';
        case Keyboard.CtrlLeft:
            return event.code === 'ControlLeft';
        case Keyboard.CtrlRight:
            return event.code === 'ControlRight';
        case Keyboard.Delete:
            return event.key === 'Delete';
        case Keyboard.End:
            return event.key === 'End';
        case Keyboard.Enter:
            return event.key === 'Enter';
        case Keyboard.Home:
            return event.key === 'Home';
        case Keyboard.NumLock:
            return event.key === 'NumLock';
        case Keyboard.NumpadEnter:
            return event.code === 'NumpadEnter';
        case Keyboard.PageDown:
            return event.key === 'PageDown';
        case Keyboard.PageUp:
            return event.key === 'PageUp';
        case Keyboard.Shift:
            return event.key === 'Shift';
        case Keyboard.ShiftLeft:
            return event.code === 'ShiftLeft';
        case Keyboard.ShiftRight:
            return event.code === 'ShiftRight';
        case Keyboard.Tab:
            return event.key === 'Tab';

        default:
            // Never run to here
            console.error('Error in checking control keys.');
            return false;
    }
};

const checkCombinationKeys: Checker = (event, key) => {
    if (!checkKeyCombination(event)) return false;

    switch (key) {
        case Keyboard.CtrlTab:
            return event.ctrlKey && event.key === 'Tab';

        default:
            // Never run to here
            console.error('Error in checking combination keys.');
            return false;
    }
};

export type UseKeyHandler = (event: KeyboardEvent) => void;

function filterKey(event: KeyboardEvent, key: Keyboard, handler: UseKeyHandler): void {
    if (key >= Keyboard.KeyA && key <= Keyboard.KeyZ) {
        if (checkChar(event, key)) {
            handler(event);
        }
    } else if (key >= Keyboard.A && key <= Keyboard.Z) {
        if (checkUpperCaseChar(event, key)) {
            handler(event);
        }
    } else if (key >= Keyboard.a && key <= Keyboard.z) {
        if (checkLowerCaseChar(event, key)) {
            handler(event);
        }
    } else if (key >= Keyboard.Num0 && key <= Keyboard.Num9) {
        if (checkNum(event, key)) {
            handler(event);
        }
    } else if (key >= Keyboard.Digit0 && key <= Keyboard.Digit9) {
        if (checkDigitNum(event, key)) {
            handler(event);
        }
    } else if (key >= Keyboard.Numpad0 && key <= Keyboard.Numpad9) {
        if (checkNumpadNum(event, key)) {
            handler(event);
        }
    } else if (key >= Keyboard.Add && key <= Keyboard.Space) {
        if (checkSpecialKeys(event, key)) {
            handler(event);
        }
    } else if (key >= Keyboard.ArrowDown && key <= Keyboard.Tab) {
        if (checkControlKeys(event, key)) {
            handler(event);
        }
    } else if (key >= Keyboard.CtrlTab && key <= Keyboard.CtrlTab) {
        if (checkCombinationKeys(event, key)) {
            handler(event);
        }
    }
}

export type KeyboardEventType = 'keydown' | 'keypress' | 'keyup';

function _useKeyImpl(
    element: HTMLElement | null,
    type: KeyboardEventType,
    key: Keyboard | undefined,
    handler: UseKeyHandler,
): void {
    const _handler = useCallback(
        (event: KeyboardEvent) => (key ? filterKey(event, key, handler) : handler(event)),
        [handler, key],
    );

    useEffect(() => {
        element?.addEventListener(type, _handler);

        return () => {
            element?.removeEventListener(type, _handler);
        };
    }, [_handler, element, type]);
}

export function useKey(element: HTMLElement | null, type: KeyboardEventType, handler: UseKeyHandler): void;
export function useKey(
    element: HTMLElement | null,
    type: KeyboardEventType,
    key: Keyboard,
    handler: UseKeyHandler,
): void;
export function useKey(
    element: HTMLElement | null,
    type: KeyboardEventType,
    keyOrHandler: Keyboard | UseKeyHandler,
    handler?: UseKeyHandler,
): void {
    if (typeof keyOrHandler === 'number') {
        _useKeyImpl(element, type, keyOrHandler, handler!);
    } else {
        _useKeyImpl(element, type, undefined, keyOrHandler);
    }
}

export function useKeyDown(element: HTMLElement | null, handler: UseKeyHandler): void;
export function useKeyDown(element: HTMLElement | null, key: Keyboard, handler: UseKeyHandler): void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useKeyDown(element: HTMLElement | null, ...args: [any, any?]): void {
    useKey(element, 'keydown', ...args);
}

export function useKeyPress(element: HTMLElement | null, handler: UseKeyHandler): void;
export function useKeyPress(element: HTMLElement | null, key: Keyboard, handler: UseKeyHandler): void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useKeyPress(element: HTMLElement | null, ...args: [any, any?]): void {
    useKey(element, 'keypress', ...args);
}

export function useKeyUp(element: HTMLElement | null, handler: UseKeyHandler): void;
export function useKeyUp(element: HTMLElement | null, key: Keyboard, handler: UseKeyHandler): void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useKeyUp(element: HTMLElement | null, ...args: [any, any?]): void {
    useKey(element, 'keyup', ...args);
}

function _useWindowKeyImpl(type: KeyboardEventType, key: Keyboard | undefined, handler: UseKeyHandler): void {
    const _handler = useCallback(
        (event: KeyboardEvent) => (key ? filterKey(event, key, handler) : handler(event)),
        [handler, key],
    );

    useEffect(() => {
        window.addEventListener(type, _handler);

        return () => {
            window.removeEventListener(type, _handler);
        };
    }, [_handler, type]);
}

export function useWindowKey(type: KeyboardEventType, handler: UseKeyHandler): void;
export function useWindowKey(type: KeyboardEventType, key: Keyboard, handler: UseKeyHandler): void;
export function useWindowKey(
    type: KeyboardEventType,
    keyOrHandler: Keyboard | UseKeyHandler,
    handler?: UseKeyHandler,
): void {
    if (typeof keyOrHandler === 'number') {
        _useWindowKeyImpl(type, keyOrHandler, handler!);
    } else {
        _useWindowKeyImpl(type, undefined, keyOrHandler);
    }
}

export function useWindowKeyDown(handler: UseKeyHandler): void;
export function useWindowKeyDown(key: Keyboard, handler: UseKeyHandler): void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useWindowKeyDown(...args: [any, any?]): void {
    useWindowKey('keydown', ...args);
}

export function useWindowKeyPress(handler: UseKeyHandler): void;
export function useWindowKeyPress(key: Keyboard, handler: UseKeyHandler): void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useWindowKeyPress(...args: [any, any?]): void {
    useWindowKey('keypress', ...args);
}

export function useWindowKeyUp(handler: UseKeyHandler): void;
export function useWindowKeyUp(key: Keyboard, handler: UseKeyHandler): void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useWindowKeyUp(...args: [any, any?]): void {
    useWindowKey('keyup', ...args);
}
