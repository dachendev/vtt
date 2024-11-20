import { CanvasLayer } from "./CanvasLayer";
import { clamp, compareDecimals } from "./mathUtils";

export interface DrawableObject {
  draw: (context: CanvasRenderingContext2D) => void;
  containsPoint: (x: number, y: number) => boolean;
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

  getLocalPosition(e: MouseEvent) {
    const { left, top } = this.canvas.getBoundingClientRect();
    return {
      localX: e.clientX - this.skewX - left,
      localY: e.clientY - this.skewY - top,
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

  onWheel(e: WheelEvent) {
    const zoomChange = e.deltaY < 0 ? zoomStep : -zoomStep;
    const newZoom = clamp(this.zoom + zoomChange, zoomMin, zoomMax);
    if (compareDecimals(newZoom, this.zoom)) return;

    const { localX, localY } = this.getLocalPosition(e);
    const zoomRatio = newZoom / this.zoom;

    this.skewX += localX * (1 - zoomRatio);
    this.skewY += localY * (1 - zoomRatio);
    this.zoom = newZoom;

    this.scheduleDraw();
  }

  onMouseDown(e: MouseEvent) {
    this.isMouseDown = true;

    const { localX, localY } = this.getLocalPosition(e);
    const obj = this.findAtPoint(localX, localY);
    console.log(obj);
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
