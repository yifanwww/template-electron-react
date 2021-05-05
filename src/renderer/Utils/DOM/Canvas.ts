import { IDotPosition, IElementSize, IOffset } from '../GlobalTypes';

export interface IDrawCanvasLineOptions {
    lineWidth?: number;
    strokeStyle?: string;
}

function drawLines(context: CanvasRenderingContext2D, dots: IDotPosition[], options?: IDrawCanvasLineOptions): void {
    if (options?.lineWidth) context.lineWidth = options.lineWidth;
    if (options?.strokeStyle) context.strokeStyle = options.strokeStyle;

    context.beginPath();
    for (let index = 0; index < dots.length; index++) {
        if (index === 0) {
            context.moveTo(dots[index].x, dots[index].y);
        } else {
            context.lineTo(dots[index].x, dots[index].y);
        }
    }
    context.stroke();
    context.closePath();
}

function drawLinesOffset(
    context: CanvasRenderingContext2D,
    dots: IDotPosition[],
    offset: IOffset,
    options?: IDrawCanvasLineOptions,
): void {
    drawLines(
        context,
        dots.map((dot) => ({ x: dot.x + offset.x, y: dot.y + offset.y })),
        options,
    );
}

export interface IDrawCanvasRectOptions {
    fillStyle?: string;
}

function fillRects(context: CanvasRenderingContext2D, rects: IElementSize[], options?: IDrawCanvasRectOptions): void {
    if (options?.fillStyle) context.fillStyle = options.fillStyle;

    for (let index = 0; index < rects.length; index++) {
        context.fillRect(rects[index].left, rects[index].top, rects[index].width, rects[index].height);
    }
}

function fillRectsOffset(
    context: CanvasRenderingContext2D,
    rects: IElementSize[],
    offset: IOffset,
    options?: IDrawCanvasRectOptions,
): void {
    fillRects(
        context,
        rects.map((rect) => ({
            left: rect.left + offset.x,
            top: rect.top + offset.y,
            width: rect.width,
            height: rect.height,
        })),
        options,
    );
}

export const CanvasUtils = {
    drawLines,
    drawLinesOffset,
    fillRects,
    fillRectsOffset,
};
