import { CanvasMouseEvent } from "./CanvasManager";
import { CanvasObject } from "./CanvasObject";

export class CanvasMoveable extends CanvasObject {
  isDragging = false;

  constructor(type: string, public x: number, public y: number) {
    super(type);
    this.setup();
  }

  setup() {
    this.subscribe("mousedown", this.onMouseDown.bind(this));
    this.subscribe("mouseup", this.onMouseUp.bind(this));
    this.subscribe("mousemove", this.onMouseMove.bind(this));
    this.subscribe("mouseout", this.onMouseOut.bind(this));
  }

  onMouseDown(event: CanvasMouseEvent) {
    if (event.originalEvent.button === 0) {
      this.isDragging = true;
    }
  }

  onMouseUp(event: CanvasMouseEvent) {
    if (event.originalEvent.button === 0) {
      this.isDragging = false;
    }
  }

  onMouseMove(event: CanvasMouseEvent) {
    if (!this.isDragging) return;

    this.x += event.movementX;
    this.y += event.movementY;

    event.canvasManager.needsRedraw = true;
  }

  onMouseOut() {
    this.isDragging = false;
  }
}
