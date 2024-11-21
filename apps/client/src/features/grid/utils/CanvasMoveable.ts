import { CanvasMouseEvent, CanvasObject } from "./CanvasObject";

export class CanvasMoveable extends CanvasObject {
  isDragging = false;

  constructor(type: string, public x: number, public y: number) {
    super(type);
  }

  setup() {
    this.subscribe("mousedown", this.onMouseDown.bind(this));
    this.subscribe("mousemove", this.onMouseMove.bind(this));
    this.subscribe("mouseleave", this.onMouseLeave.bind(this));
    this.subscribe("mouseup", this.onMouseUp.bind(this));
  }

  onMouseDown(event: CanvasMouseEvent) {
    if (event.domEvent.button === 0) {
      this.isDragging = true;
    }
  }

  onMouseUp(event: CanvasMouseEvent) {
    if (event.domEvent.button === 0) {
      this.isDragging = false;
    }
  }

  onMouseMove(event: CanvasMouseEvent) {
    if (!this.isDragging) return;

    this.x += event.movementX;
    this.y += event.movementY;

    event.canvasManager.scheduleRedraw();
  }

  onMouseLeave() {
    this.isDragging = false;
  }
}
