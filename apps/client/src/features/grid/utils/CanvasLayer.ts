import { CanvasObject } from "./CanvasObject";

export class CanvasLayer {
  constructor(public name: string, public objects: CanvasObject[] = []) {}

  appendObject(object: CanvasObject) {
    this.objects.push(object);
    object.setup();
  }

  findAtPoint(x: number, y: number) {
    let result = null;
    for (let i = this.objects.length - 1; i >= 0; i--) {
      const obj = this.objects[i];
      if (obj.containsPoint(x, y)) return obj;
    }
    return result;
  }

  draw(context: CanvasRenderingContext2D) {
    this.objects.forEach((obj) => obj.draw(context));
  }
}
