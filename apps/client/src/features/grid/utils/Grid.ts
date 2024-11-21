import { CanvasObject } from "./CanvasObject";

export class Grid extends CanvasObject {
  constructor(
    public width: number,
    public height: number,
    public squareSize: number,
    public strokeStyle: string = "#000"
  ) {
    super("grid");
  }

  draw(context: CanvasRenderingContext2D) {
    context.strokeStyle = this.strokeStyle;
    context.strokeRect(0, 0, this.width, this.height);

    context.beginPath();

    for (let x = 0; x < this.width; x += this.squareSize) {
      context.moveTo(x, 0);
      context.lineTo(x, this.height);
    }

    for (let y = 0; y < this.height; y += this.squareSize) {
      context.moveTo(0, y);
      context.lineTo(this.width, y);
    }

    context.closePath();
    context.stroke();
  }
}
