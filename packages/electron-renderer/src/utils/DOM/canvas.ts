import { IDotPosition, IOffset, IRectPosition, ITextWithPosition } from './types';

export interface CanvasLinePainter {
    begin(): void;
    newLine(): void;
    next(x: number, y: number): void;
    end(): void;
}

export interface CanvasRectPainter {
    fill(left: number, top: number, width: number, height: number): void;
}

export interface CanvasTextPainter {
    fill(text: string, x: number, y: number): void;
}

export abstract class CanvasUtils {
    private static zeroOffset: IOffset = { x: 0, y: 0 };

    static createLinePainter(context: CanvasRenderingContext2D, offset: IOffset = this.zeroOffset): CanvasLinePainter {
        type Next = (x: number, y: number) => void;

        let _next: Optional<Next> = null;

        const _lineTo: Next = (x, y) => context.lineTo(x, y);
        const _moveTo: Next = (x, y) => {
            context.moveTo(x, y);
            _next = _lineTo;
        };

        function begin() {
            context.beginPath();
            _next = _moveTo;
        }

        function newLine() {
            _next = _moveTo;
        }

        function next(x: number, y: number) {
            _next!(x + offset.x, y + offset.y);
        }

        function end() {
            context.stroke();
            context.closePath();
        }

        return { begin, newLine, next, end };
    }

    static createRectPainter(context: CanvasRenderingContext2D, offset: IOffset = this.zeroOffset): CanvasRectPainter {
        function fill(left: number, top: number, width: number, height: number) {
            context.fillRect(left + offset.x, top + offset.y, width, height);
        }

        return { fill };
    }

    static createTextPainter(context: CanvasRenderingContext2D, offset: IOffset = this.zeroOffset): CanvasTextPainter {
        function fill(text: string, x: number, y: number) {
            context.fillText(text, x + offset.y, y + offset.y);
        }

        return { fill };
    }

    static drawLines(context: CanvasRenderingContext2D, dots: IDotPosition[], offset: IOffset = this.zeroOffset): void {
        if (dots.length === 0) return;

        context.beginPath();
        context.moveTo(dots[0].x + offset.x, dots[0].y + offset.y);
        for (let index = 1; index < dots.length; index++) {
            context.lineTo(dots[index].x + offset.x, dots[index].y + offset.y);
        }
        context.stroke();
        context.closePath();
    }

    static fillRects(
        context: CanvasRenderingContext2D,
        rects: IRectPosition | IRectPosition[],
        offset: IOffset = this.zeroOffset,
    ): void {
        if (Array.isArray(rects) && rects.length === 0) return;

        if (!Array.isArray(rects)) {
            context.fillRect(rects.left + offset.x, rects.top + offset.y, rects.width, rects.height);
        } else {
            for (let i = 0; i < rects.length; i++) {
                context.fillRect(rects[i].left + offset.x, rects[i].top + offset.y, rects[i].width, rects[i].height);
            }
        }
    }

    static fillTexts(
        context: CanvasRenderingContext2D,
        texts: ITextWithPosition | ITextWithPosition[],
        offset: IOffset = this.zeroOffset,
    ): void {
        if (!Array.isArray(texts)) {
            const { text } = texts;
            context.fillText(typeof text === 'string' ? text : text.toString(), texts.x + offset.x, texts.y + offset.y);
        } else {
            for (let i = 0; i < texts.length; i++) {
                const { text, x, y } = texts[i];
                context.fillText(typeof text === 'string' ? text : text.toString(), x + offset.x, y + offset.y);
            }
        }
    }
}
