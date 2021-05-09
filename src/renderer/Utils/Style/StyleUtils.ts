import { num2px } from './Num2String';

export interface IMarginInfo {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

interface IMargin1 {
    margin: number;
}

interface IMargin2 {
    horizontal: number;
    vertical: number;
}

export type IMargin = IMargin1 | IMargin2 | IMarginInfo;

function genMargin(margin: IMargin): IMarginInfo {
    if ('margin' in margin) {
        return {
            top: margin.margin,
            right: margin.margin,
            bottom: margin.margin,
            left: margin.margin,
        };
    } else if ('horizontal' in margin) {
        return {
            top: margin.vertical,
            right: margin.horizontal,
            bottom: margin.vertical,
            left: margin.horizontal,
        };
    } else {
        return margin;
    }
}

function genMarginStr(margin: IMargin): string {
    const _margin = genMargin(margin);
    return `${_margin.top}px ${_margin.right}px ${_margin.bottom}px ${_margin.left}px`;
}

function mergeToGridTemplate(arr: (number | string)[]) {
    const _arr = arr.map((element) => (typeof element === 'string' ? element : num2px(element)));
    return _arr.join(' ');
}

export const StyleUtils = {
    genMargin,
    genMarginStr,
    mergeToGridTemplate,
};
