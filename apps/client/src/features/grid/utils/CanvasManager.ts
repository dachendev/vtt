import { CanvasLayer } from "./CanvasLayer";
import { clamp, compareDecimals } from "./mathUtils";

export interface DrawableObject {
  draw: (context: CanvasRenderingContext2D) => void;
}

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
  layers: CanvasLayer[];

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
    this.layers = [];
  }

  addLayer(layer: CanvasLayer) {
    this.layers.push(layer);
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

  draw() {
    this.clear();
    this.setTransform();
    this.layers.forEach((layer) => layer.draw(this.context));
  }

  scheduleDraw() {
    requestAnimationFrame(() => this.draw());
  }

  onWheel(e: WheelEvent) {
    const zoomChange = e.deltaY < 0 ? zoomStep : -zoomStep;
    const newZoom = clamp(this.zoom + zoomChange, zoomMin, zoomMax);
    if (compareDecimals(newZoom, this.zoom)) return;

    const { left, top } = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    const zoomRatio = newZoom / this.zoom;

    this.skewX += (mouseX - this.skewX) * (1 - zoomRatio);
    this.skewY += (mouseY - this.skewY) * (1 - zoomRatio);
    this.zoom = newZoom;

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

  attachEvents() {
    this.canvas.addEventListener("wheel", this.onWheel.bind(this));
    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvas.addEventListener("mouseout", this.onMouseOut.bind(this));
    window.addEventListener("mouseup", this.onMouseUp.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  detachEvents() {
    this.canvas.removeEventListener("wheel", this.onWheel.bind(this));
    this.canvas.removeEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvas.removeEventListener("mouseout", this.onMouseOut.bind(this));
    window.removeEventListener("mouseup", this.onMouseUp.bind(this));
    window.removeEventListener("mousemove", this.onMouseMove.bind(this));
  }
}
