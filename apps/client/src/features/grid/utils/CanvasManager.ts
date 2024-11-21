import { EventManager } from "./EventManager";
import { clamp, compareDecimals } from "./mathUtils";
import { CanvasView } from "./CanvasView";

export interface CanvasEvent<T extends Event> {
  originalEvent: T;
  canvasManager: CanvasManager;
  type: string;
}

export interface CanvasMouseEvent extends CanvasEvent<MouseEvent> {
  x: number;
  y: number;
  movementX: number;
  movementY: number;
}

const zoomStep = 0.1;
const zoomMin = 0.5;
const zoomMax = 1.5;

export class CanvasManager {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  zoom = 1;
  isDragging = false;
  skewX = 0;
  skewY = 0;
  canvasEventManager: EventManager<HTMLCanvasElement, HTMLElementEventMap>;
  windowEventManager = new EventManager<Window, WindowEventMap>(window);
  frameId: number | null = null;
  activeView: CanvasView | null = null;
  isDirty = true;

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Failed to get 2D context");
    }

    this.canvas = canvas;
    this.context = context;
    this.canvasEventManager = new EventManager(canvas);

    this.setup();
  }

  setup() {
    this.canvasEventManager.on("wheel", this.onWheel.bind(this));
    this.canvasEventManager.on("mousedown", this.onMouseDown.bind(this));
    this.canvasEventManager.on("mousemove", this.onMouseMove.bind(this));
    this.canvasEventManager.on("mouseout", this.onMouseOut.bind(this));
    this.windowEventManager.on("mouseup", this.onMouseUp.bind(this));

    // forward events
    this.canvasEventManager.on("mousedown", this.onMouseEvent.bind(this));
    this.canvasEventManager.on("mousemove", this.onMouseEvent.bind(this));
    this.canvasEventManager.on("mouseout", this.onMouseEvent.bind(this));
    this.windowEventManager.on("mouseup", this.onMouseEvent.bind(this));
  }

  clear() {
    this.context.resetTransform();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    if (!this.isDirty) return;

    this.clear();
    this.applyTransform();

    if (this.activeView) {
      this.activeView.draw(this.context);
    }

    this.isDirty = false;
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

  getLocalPosition(event: MouseEvent) {
    const { left, top } = this.canvas.getBoundingClientRect();
    return {
      localX: (event.clientX - left - this.skewX) / this.zoom,
      localY: (event.clientY - top - this.skewY) / this.zoom,
    };
  }

  onMouseEvent(event: MouseEvent) {
    if (!this.activeView) return;

    const { localX, localY } = this.getLocalPosition(event);

    const eventData = {
      originalEvent: event,
      canvasManager: this,
      type: event.type,
      x: localX,
      y: localY,
      movementX: event.movementX / this.zoom,
      movementY: event.movementY / this.zoom,
    } as CanvasMouseEvent;

    this.activeView.onMouseEvent(eventData);
  }

  onWheel(event: WheelEvent) {
    const zoomChange = event.deltaY < 0 ? zoomStep : -zoomStep;
    const newZoom = clamp(this.zoom + zoomChange, zoomMin, zoomMax);
    if (compareDecimals(newZoom, this.zoom)) return;

    const { left, top } = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - left;
    const mouseY = event.clientY - top;

    const zoomRatio = newZoom / this.zoom;

    this.skewX += (mouseX - this.skewX) * (1 - zoomRatio);
    this.skewY += (mouseY - this.skewY) * (1 - zoomRatio);
    this.zoom = newZoom;

    this.isDirty = true;
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

    this.isDirty = true;
  }

  onMouseOut() {
    this.isDragging = false;
  }

  destroy() {
    this.canvasEventManager.removeAllListeners();
    this.windowEventManager.removeAllListeners();
  }
}
