import { CanvasMouseEvent } from "./CanvasManager";
import { CanvasObject } from "./CanvasObject";

export class CanvasMoveable extends CanvasObject {
  isDragging = false;

  constructor(type: string, public x: number, public y: number) {
    super(type);
  }

  setup() {
    this.subscribe("mousedown", this.onMouseDown.bind(this));
    this.subscribe("mouseup", this.onMouseUp.bind(this));
    this.subscribe("mousemove", this.onMouseMove.bind(this));
    this.subscribe("mouseleave", this.onMouseLeave.bind(this));
  }

  onMouseDown(event: CanvasMouseEvent) {
    if (event.originalEvent.button === 0) {
      this.isDragging = true;
    }
  }

  onMouseUp(event: CanvasMouseEvent) {
    if (event.originalEvent.button === 0) {
      this.isDragging = false;

      // snap to grid
      const gridCellSize = 50;
      this.x = Math.round(this.x / gridCellSize) * gridCellSize;
      this.y = Math.round(this.y / gridCellSize) * gridCellSize;

      event.canvasManager.isDirty = true;
    }
  }

  onMouseMove(event: CanvasMouseEvent) {
    if (!this.isDragging) return;

    this.x += event.movementX;
    this.y += event.movementY;

    event.canvasManager.isDirty = true;
  }

  onMouseLeave() {
    this.isDragging = false;
  }
}
