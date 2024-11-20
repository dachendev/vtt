import { CanvasRect } from "./CanvasRect";

export class Grid extends CanvasRect {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public squareSize: number,
    public strokeStyle: string = "#000"
  ) {
    super(x, y, width, height);
  }

  draw(context: CanvasRenderingContext2D) {
    context.strokeStyle = this.strokeStyle;
    context.strokeRect(this.x, this.y, this.width, this.height);

    context.beginPath();

    for (
      let x = this.x + this.squareSize;
      x < this.x + this.width;
      x += this.squareSize
    ) {
      context.moveTo(x, this.y);
      context.lineTo(x, this.y + this.height);
    }

    for (
      let y = this.y + this.squareSize;
      y < this.y + this.height;
      y += this.squareSize
    ) {
      context.moveTo(this.x, y);
      context.lineTo(this.x + this.width, y);
    }

    context.closePath();
    context.stroke();
  }
}
