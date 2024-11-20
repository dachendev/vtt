import { CanvasObject } from "./CanvasObject";

export class CanvasGrid extends CanvasObject {
  constructor(public squareSize: number, public strokeStyle: string = "#000") {
    super("grid");
  }

  draw(context: CanvasRenderingContext2D) {
    context.strokeStyle = this.strokeStyle;
    context.strokeRect(0, 0, context.canvas.width, context.canvas.height);

    context.beginPath();

    for (let x = 0; x < context.canvas.width; x += this.squareSize) {
      context.moveTo(x, 0);
      context.lineTo(x, context.canvas.height);
    }

    for (let y = 0; y < context.canvas.height; y += this.squareSize) {
      context.moveTo(0, y);
      context.lineTo(context.canvas.width, y);
    }

    context.closePath();
    context.stroke();
  }
}
