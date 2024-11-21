import { CanvasObject } from "./CanvasObject";
import { CanvasView } from "./CanvasView";

export class CanvasGrid extends CanvasObject {
  constructor(public squareSize: number, public strokeStyle: string = "#000") {
    super("grid");
  }

  draw(context: CanvasRenderingContext2D, view: CanvasView) {
    context.strokeStyle = this.strokeStyle;
    context.strokeRect(0, 0, view.width, view.height);

    context.beginPath();

    for (let x = 0; x < view.width; x += this.squareSize) {
      context.moveTo(x, 0);
      context.lineTo(x, view.height);
    }

    for (let y = 0; y < view.height; y += this.squareSize) {
      context.moveTo(0, y);
      context.lineTo(view.width, y);
    }

    context.closePath();
    context.stroke();
  }
}
