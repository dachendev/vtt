import { DrawableObject } from "./CanvasManager";
import { findHypotenuse } from "./mathUtils";

export class CanvasCircle implements DrawableObject {
  constructor(public x: number, public y: number, public radius: number) {}

  getCenterPoint() {
    return {
      centerX: this.x + this.radius,
      centerY: this.y + this.radius,
    };
  }

  draw(context: CanvasRenderingContext2D) {
    const { centerX, centerY } = this.getCenterPoint();
    context.beginPath();
    context.arc(centerX, centerY, this.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }

  containsPoint(x: number, y: number) {
    const { centerX, centerY } = this.getCenterPoint();
    const distance = findHypotenuse(x - centerX, y - centerY);
    return distance <= this.radius;
  }
}
