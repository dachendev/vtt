import { CanvasEventTarget } from "./CanvasEventTarget";

export class CanvasObject extends CanvasEventTarget {
  constructor(public x: number, public y: number) {
    super();
  }

  setup() {}

  destroy() {}

  draw(context: CanvasRenderingContext2D) {
    throw new Error("Method not implemented");
  }

  containsPoint(x: number, y: number): boolean {
    throw new Error("Method not implemented");
  }
}
