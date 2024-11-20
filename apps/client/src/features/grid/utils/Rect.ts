import { CanvasObject } from "./CanvasObject";

export class Rect extends CanvasObject {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    super(x, y);
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  containsPoint(x: number, y: number) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }
}
