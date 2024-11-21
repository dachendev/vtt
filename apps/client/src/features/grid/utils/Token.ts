import { findHypotenuse } from "./mathUtils";
import { CanvasMoveable } from "./CanvasMoveable";
import { CanvasMouseEvent } from "./CanvasManager";

export class Token extends CanvasMoveable {
  constructor(x: number, y: number, public radius: number) {
    super("token", x, y);
  }

  inBounds(x: number, y: number) {
    const centerX = this.x + this.radius;
    const centerY = this.y + this.radius;
    const distanceToCenter = findHypotenuse(x - centerX, y - centerY);

    return distanceToCenter <= this.radius;
  }

  snapToGrid() {
    const gridSize = 50;
    this.x = Math.round(this.x / gridSize) * gridSize;
    this.y = Math.round(this.y / gridSize) * gridSize;
  }

  draw(context: CanvasRenderingContext2D) {
    const centerX = this.x + this.radius;
    const centerY = this.y + this.radius;
    context.beginPath();
    context.arc(centerX, centerY, this.radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }

  onMouseUp(event: CanvasMouseEvent) {
    if (event.originalEvent.button === 0) {
      this.isDragging = false;
      this.snapToGrid();
      event.canvasManager.needsRedraw = true;
    }
  }
}
