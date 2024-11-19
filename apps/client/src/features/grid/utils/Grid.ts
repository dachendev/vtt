import { CanvasObject } from "./CanvasObject";

interface GridOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  squareSize: number;
  strokeStyle?: string;
}

export class Grid extends CanvasObject {
  squareSize: number;
  strokeStyle: string;

  constructor({
    x,
    y,
    width,
    height,
    squareSize,
    strokeStyle = "#000",
  }: GridOptions) {
    super(x, y, width, height);
    this.squareSize = squareSize;
    this.strokeStyle = strokeStyle;
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

    context.stroke();
  }
}
