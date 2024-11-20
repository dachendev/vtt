import { findHypotenuse } from "./mathUtils";
import { CanvasMoveable } from "./CanvasMoveable";

export class CanvasToken extends CanvasMoveable {
  constructor(x: number, y: number, public radius: number) {
    super("token", x, y);
  }

  containsPoint(x: number, y: number) {
    const centerX = this.x + this.radius;
    const centerY = this.y + this.radius;
    const distanceToCenter = findHypotenuse(x - centerX, y - centerY);

    return distanceToCenter <= this.radius;
  }

  draw(context: CanvasRenderingContext2D) {
    const centerX = this.x + this.radius;
    const centerY = this.y + this.radius;
    context.beginPath();
    context.arc(centerX, centerY, this.radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }
}
