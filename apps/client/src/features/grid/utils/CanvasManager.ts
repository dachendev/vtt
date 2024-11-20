import { EventManager } from "./EventManager";
import { CanvasLayer } from "./CanvasLayer";
import { clamp, compareDecimals } from "./mathUtils";

const zoomStep = 0.1;
const zoomMin = 0.5;
const zoomMax = 2;

export class CanvasManager {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  zoom = 1;
  isMouseDown = false;
  skewX = 0;
  skewY = 0;
  layers: CanvasLayer[] = [];
  eventManager: EventManager;

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Failed to get 2D context");
    }

    this.canvas = canvas;
    this.context = context;
    this.eventManager = new EventManager(canvas);
  }

  appendLayer(layer: CanvasLayer) {
    this.layers.push(layer);
  }

  getLocalPosition(event: MouseEvent) {
    const { left, top } = this.canvas.getBoundingClientRect();
    return {
      localX: event.clientX - left - this.skewX,
      localY: event.clientY - top - this.skewY,
    };
  }

  findAtPoint(x: number, y: number) {
    let result = null;

    for (let i = this.layers.length - 1; i >= 0; i--) {
      const layer = this.layers[i];
      const obj = layer.findAtPoint(x, y);
      if (obj) return obj;
    }

    return result;
  }

  clear() {
    this.context.save();
    this.context.resetTransform();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
  }

  applyTransform() {
    this.context.setTransform(
      this.zoom,
      0,
      0,
      this.zoom,
      this.skewX,
      this.skewY
    );
  }

  draw() {
    this.clear();
    this.layers.forEach((layer) => layer.draw(this.context));
  }

  scheduleDraw() {
    requestAnimationFrame(() => this.draw());
  }

  onWheel(event: WheelEvent) {
    const zoomChange = event.deltaY < 0 ? zoomStep : -zoomStep;
    const newZoom = clamp(this.zoom + zoomChange, zoomMin, zoomMax);
    if (compareDecimals(newZoom, this.zoom)) return;

    const { localX, localY } = this.getLocalPosition(event);
    const zoomRatio = newZoom / this.zoom;

    this.skewX += localX * (1 - zoomRatio);
    this.skewY += localY * (1 - zoomRatio);
    this.zoom = newZoom;

    this.applyTransform();
    this.scheduleDraw();
  }

  onMouseDown() {
    this.isMouseDown = true;
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown) return;

    const { movementX, movementY } = event;
    this.skewX += movementX;
    this.skewY += movementY;

    this.applyTransform();
    this.scheduleDraw();
  }

  onMouseOut() {
    this.isMouseDown = false;
  }

  forwardMouseEvent(type: Canvas.MouseEventType) {
    return (event: MouseEvent) => {
      const { localX, localY } = this.getLocalPosition(event);
      const obj = this.findAtPoint(localX, localY);

      if (obj) {
        obj.publish(type, {
          domEvent: event,
          x: localX,
          y: localY,
        });
      }
    };
  }

  setup() {
    this.eventManager.on("mousedown", this.forwardMouseEvent("mousedown"));
    this.eventManager.on("wheel", this.onWheel.bind(this));
    this.eventManager.on("mousedown", this.onMouseDown.bind(this));
    this.eventManager.on("mouseout", this.onMouseOut.bind(this));
    window.addEventListener("mouseup", this.onMouseUp.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  destroy() {
    this.eventManager.removeAllListeners();
    window.removeEventListener("mouseup", this.onMouseUp.bind(this));
    window.removeEventListener("mousemove", this.onMouseMove.bind(this));
  }
}
