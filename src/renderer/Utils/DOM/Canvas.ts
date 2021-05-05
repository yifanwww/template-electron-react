import { IDotPosition, IRectPosition, IOffset } from '../GlobalTypes';

export interface IDrawCanvasLineOptions {
    lineWidth?: number;
    strokeStyle?: string;
}

function drawLinesOffset(
    context: CanvasRenderingContext2D,
    dots: IDotPosition[],
    offset: IOffset,
    options?: IDrawCanvasLineOptions,
): void {
    if (options?.lineWidth) context.lineWidth = options.lineWidth;
    if (options?.strokeStyle) context.strokeStyle = options.strokeStyle;

    const { x: offsetx, y: offsety } = offset;

    context.beginPath();
    for (let index = 0; index < dots.length; index++) {
        const { x, y } = dots[index];
        if (index === 0) {
            context.moveTo(x + offsetx, y + offsety);
        } else {
            context.lineTo(x + offsetx, y + offsety);
        }
    }
    context.stroke();
    context.closePath();
}

function drawLines(context: CanvasRenderingContext2D, dots: IDotPosition[], options?: IDrawCanvasLineOptions): void {
    drawLinesOffset(context, dots, { x: 0, y: 0 }, options);
}

export interface IDrawCanvasRectOptions {
    fillStyle?: string;
}

function fillRectsOffset(
    context: CanvasRenderingContext2D,
    rects: IRectPosition[],
    offset: IOffset,
    options?: IDrawCanvasRectOptions,
): void {
    if (options?.fillStyle) context.fillStyle = options.fillStyle;

    const { x: offsetx, y: offsety } = offset;

    for (let index = 0; index < rects.length; index++) {
        const { left, top, width, height } = rects[index];
        context.fillRect(left + offsetx, top + offsety, width, height);
    }
}

function fillRects(context: CanvasRenderingContext2D, rects: IRectPosition[], options?: IDrawCanvasRectOptions): void {
    fillRectsOffset(context, rects, { x: 0, y: 0 }, options);
}

export const CanvasUtils = {
    drawLines,
    drawLinesOffset,
    fillRects,
    fillRectsOffset,
};
