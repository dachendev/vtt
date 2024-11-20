import { CanvasObject } from "./CanvasObject";
import { findHypotenuse } from "./mathUtils";

export class CanvasCircle extends CanvasObject {
  constructor(public x: number, public y: number, public radius: number) {
    super(x, y);
  }

  containsPoint(x: number, y: number) {
    const centerX = this.x + this.radius;
    const centerY = this.y + this.radius;
    const distanceToCenter = findHypotenuse(x - centerX, y - centerY);

    return distanceToCenter <= this.radius;
  }
}
