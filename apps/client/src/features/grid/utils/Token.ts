import { CanvasObject } from "./CanvasObject";
import { fillCircle } from "./canvasUtils";

export class Token extends CanvasObject {
  size: number;

  constructor(x: number, y: number, size: number) {
    super(x, y, size, size);
    this.size = size;
  }

  draw(context: CanvasRenderingContext2D) {
    fillCircle(context, this.x, this.y, this.size / 2);
  }
}
