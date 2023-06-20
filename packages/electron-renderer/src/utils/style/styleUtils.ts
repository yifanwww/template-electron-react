import { num2px } from './num2string';

export interface MarginInfo {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

interface Margin1 {
    margin: number;
}

interface Margin2 {
    horizontal: number;
    vertical: number;
}

export type Margin = Margin1 | Margin2 | MarginInfo;

export class StyleUtil {
    static genMargin(margin: Margin): MarginInfo {
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

    static genMarginStr(margin: Margin): string {
        const _margin = StyleUtil.genMargin(margin);
        return `${_margin.top}px ${_margin.right}px ${_margin.bottom}px ${_margin.left}px`;
    }

    static mergeToGridTemplate(arr: (number | string)[]) {
        const _arr = arr.map((element) => (typeof element === 'string' ? element : num2px(element)));
        return _arr.join(' ');
    }
}
