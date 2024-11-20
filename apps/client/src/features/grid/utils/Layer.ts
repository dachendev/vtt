import { CanvasObject } from "./CanvasObject";

export class Layer {
  constructor(public name: string, public objects: CanvasObject[] = []) {}

  addObject(object: CanvasObject) {
    this.objects.push(object);
  }

  draw(context: CanvasRenderingContext2D) {
    this.objects.forEach((obj) => obj.draw(context));
  }

  findAtPoint(x: number, y: number) {
    let result = null;
    for (let i = this.objects.length - 1; i >= 0; i--) {
      const obj = this.objects[i];
      if (obj.containsPoint(x, y)) return obj;
    }
    return result;
  }
}
