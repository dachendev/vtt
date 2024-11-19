import { CanvasObject } from "./CanvasObject";

const zoomStep = 0.1;
const zoomMin = 0.5;
const zoomMax = 2;

export class CanvasManager {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  zoom: number;
  isMouseDown: boolean;
  skewX: number;
  skewY: number;
  objects: CanvasObject[];

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Failed to get 2D context");
    }

    this.canvas = canvas;
    this.context = context;
    this.zoom = 1;
    this.isMouseDown = false;
    this.skewX = 0;
    this.skewY = 0;
    this.objects = [];
  }

  clear() {
    this.context.save();
    this.context.resetTransform();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
  }

  setTransform() {
    this.context.setTransform(
      this.zoom,
      0,
      0,
      this.zoom,
      this.skewX,
      this.skewY
    );
  }

  addObject(object: CanvasObject) {
    this.objects.push(object);
  }

  draw() {
    this.clear();
    this.setTransform();
    this.objects.forEach((obj) => obj.draw(this.context));
  }

  scheduleDraw() {
    requestAnimationFrame(() => this.draw());
  }

  onWheel(e: WheelEvent) {
    this.zoom =
      e.deltaY < 0
        ? Math.min(this.zoom + zoomStep, zoomMax)
        : Math.max(this.zoom - zoomStep, zoomMin);

    this.scheduleDraw();
  }

  onMouseDown() {
    this.isMouseDown = true;
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  onMouseMove(e: MouseEvent) {
    if (!this.isMouseDown) return;

    const { movementX, movementY } = e;
    this.skewX += movementX;
    this.skewY += movementY;

    this.scheduleDraw();
  }

  onMouseOut() {
    this.isMouseDown = false;
  }

  setup() {
    this.canvas.addEventListener("wheel", this.onWheel.bind(this));
    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvas.addEventListener("mouseout", this.onMouseOut.bind(this));
    window.addEventListener("mouseup", this.onMouseUp.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  destroy() {
    this.canvas.removeEventListener("wheel", this.onWheel.bind(this));
    this.canvas.removeEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvas.removeEventListener("mouseout", this.onMouseOut.bind(this));
    window.removeEventListener("mouseup", this.onMouseUp.bind(this));
    window.removeEventListener("mousemove", this.onMouseMove.bind(this));
  }
}
