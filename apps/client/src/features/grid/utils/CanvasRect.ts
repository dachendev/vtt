import { DrawableObject } from "./CanvasManager";

export class CanvasRect implements DrawableObject {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
