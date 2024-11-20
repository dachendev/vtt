import { PubSub } from "./PubSub";

export class CanvasObject extends PubSub<Canvas.EventMap> {
  constructor(public x: number, public y: number) {
    super();
  }

  containsPoint(x: number, y: number) {
    return false;
  }

  draw(context: CanvasRenderingContext2D) {}

  setup() {}

  destroy() {}
}
