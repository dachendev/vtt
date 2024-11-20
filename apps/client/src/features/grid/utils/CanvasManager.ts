import { EventManager } from "./EventManager";
import { CanvasLayer } from "./CanvasLayer";
import { clamp, compareDecimals } from "./mathUtils";
import { CanvasEventType } from "./CanvasObject";

const zoomStep = 0.1;
const zoomMin = 0.5;
const zoomMax = 2;

export class CanvasManager {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  zoom = 1;
  isDragging = false;
  skewX = 0;
  skewY = 0;
  layers = new Map<string, CanvasLayer>();
  layerOrder: string[] = [];
  eventManager: EventManager;
  needsRedraw = true;
  frameId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Failed to get 2D context");
    }

    this.canvas = canvas;
    this.context = context;
    this.eventManager = new EventManager(canvas);
  }

  addLayer(layer: CanvasLayer) {
    this.layers.set(layer.id, layer);
    this.layerOrder.push(layer.id);
  }

  findObjectById(id: string) {
    for (const layer of this.layers.values()) {
      const obj = layer.findById(id);
      if (obj) return obj;
    }
    return null;
  }

  findAtPoint(x: number, y: number) {
    for (let i = this.layerOrder.length - 1; i >= 0; i--) {
      const layer = this.layers.get(this.layerOrder[i])!;
      const obj = layer.findAtPoint(x, y);
      if (obj) return obj;
    }
    return null;
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
    if (!this.needsRedraw) return;

    this.clear();

    for (const id of this.layerOrder) {
      const layer = this.layers.get(id);
      if (layer) {
        layer.draw(this.context);
      }
    }

    this.needsRedraw = false;
  }

  scheduleFrame(repeat = false) {
    this.frameId = requestAnimationFrame(() => {
      this.draw();
      if (repeat) this.scheduleFrame(repeat);
    });
  }

  cancelFrame() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  getMousePosition(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;

    return {
      canvasX,
      canvasY,
      localX: (canvasX - this.skewX) / this.zoom,
      localY: (canvasY - this.skewY) / this.zoom,
    };
  }

  forwardMouseEvent(type: CanvasEventType, event: MouseEvent) {
    const canvasManager = this;

    const { localX, localY } = canvasManager.getMousePosition(event);
    const obj = canvasManager.findAtPoint(localX, localY);

    if (!obj) return;

    obj.publish(type, {
      canvasManager,
      domEvent: event,
      x: localX,
      y: localY,
      movementX: event.movementX / this.zoom,
      movementY: event.movementY / this.zoom,
    });
  }

  onWheel(event: WheelEvent) {
    const zoomChange = event.deltaY < 0 ? zoomStep : -zoomStep;
    const newZoom = clamp(this.zoom + zoomChange, zoomMin, zoomMax);
    if (compareDecimals(newZoom, this.zoom)) return;

    const { canvasX, canvasY } = this.getMousePosition(event);
    const zoomRatio = newZoom / this.zoom;

    this.skewX += (canvasX - this.skewX) * (1 - zoomRatio);
    this.skewY += (canvasY - this.skewY) * (1 - zoomRatio);
    this.zoom = newZoom;

    this.applyTransform();
    this.needsRedraw = true;
  }

  onMouseDown(event: MouseEvent) {
    if (event.button === 1) {
      this.isDragging = true;
    }
  }

  onMouseUp(event: MouseEvent) {
    if (event.button === 1) {
      this.isDragging = false;
    }
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    this.skewX += event.movementX;
    this.skewY += event.movementY;

    this.applyTransform();
    this.needsRedraw = true;
  }

  onMouseLeave() {
    this.isDragging = false;
  }

  setup() {
    // add event listeners
    this.eventManager.on("wheel", this.onWheel.bind(this));
    this.eventManager.on("mousedown", this.onMouseDown.bind(this));
    this.eventManager.on("mouseup", this.onMouseUp.bind(this));
    this.eventManager.on("mousemove", this.onMouseMove.bind(this));
    this.eventManager.on("mouseleave", this.onMouseLeave.bind(this));
    window.addEventListener("mouseup", this.onMouseUp.bind(this));

    // forward events
    const forwardMouseEvents: CanvasEventType[] = [
      "mousedown",
      "mouseup",
      "mousemove",
      "mouseleave",
    ];

    for (const type of forwardMouseEvents) {
      this.eventManager.on(type, this.forwardMouseEvent.bind(this, type));
    }
  }

  destroy() {
    this.eventManager.removeAllListeners();
    window.removeEventListener("mouseup", this.onMouseUp.bind(this));
  }
}
