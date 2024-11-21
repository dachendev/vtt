import { CanvasManager } from "./CanvasManager";
import { PubSub } from "./PubSub";
import { v4 as uuid } from "uuid";

export interface CanvasEvent<T extends Event> {
  canvasManager: CanvasManager;
  domEvent: T;
}

export interface CanvasMouseEvent extends CanvasEvent<MouseEvent> {
  x: number;
  y: number;
  movementX: number;
  movementY: number;
}

export interface CanvasEventMap {
  mousedown: CanvasMouseEvent;
  mouseup: CanvasMouseEvent;
  mousemove: CanvasMouseEvent;
  mouseleave: CanvasMouseEvent;
}

export class CanvasObject extends PubSub<CanvasEventMap> {
  id = uuid();

  constructor(public type: string) {
    super();
    this.setup();
  }

  setup() {}

  containsPoint(x: number, y: number) {
    return false;
  }

  draw(context: CanvasRenderingContext2D) {}
}
