import { DrawableObject } from "./CanvasManager";

export class CanvasCircle implements DrawableObject {
  constructor(public x: number, public y: number, public radius: number) {}

  draw(context: CanvasRenderingContext2D) {
    const centerX = this.x + this.radius;
    const centerY = this.y + this.radius;

    context.beginPath();
    context.arc(centerX, centerY, this.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }
}
