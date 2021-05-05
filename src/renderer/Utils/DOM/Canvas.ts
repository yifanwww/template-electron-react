import { IDotPosition, IElementSize } from '../GlobalTypes';

export interface ICanvasOptions extends IElementSize {
    lineWidth?: number;
    strokeStyle?: string;
}

function drawLines(context: CanvasRenderingContext2D, dots: IDotPosition[], options?: ICanvasOptions): void {
    if (options?.lineWidth) context.lineWidth = options.lineWidth;
    if (options?.strokeStyle) context.strokeStyle = options.strokeStyle;

    const left = options?.left ?? 0;
    const top = options?.top ?? 0;

    context.beginPath();
    for (let index = 0; index < dots.length; index++) {
        if (index === 0) {
            context.moveTo(left + dots[index].x, top + dots[index].y);
        } else {
            context.lineTo(left + dots[index].x, top + dots[index].y);
        }
    }
    context.stroke();
    context.closePath();
}

export const CanvasUtils = {
    drawLines,
};
