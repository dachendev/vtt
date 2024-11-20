export class CanvasObject extends EventTarget {
  constructor(public x: number, public y: number) {
    super();
  }

  draw(context: CanvasRenderingContext2D) {
    throw new Error("Method not implemented");
  }

  containsPoint(x: number, y: number): boolean {
    throw new Error("Method not implemented");
  }
}
