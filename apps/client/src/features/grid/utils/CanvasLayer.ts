import { CanvasObject } from "./CanvasObject";
import { v4 as uuid } from "uuid";

export class CanvasLayer {
  id = uuid();
  objects = new Map<string, CanvasObject>();
  objectOrder: string[] = [];

  constructor(public name: string) {}

  add(object: CanvasObject) {
    this.objects.set(object.id, object);
    this.objectOrder.push(object.id);
  }

  findById(id: string) {
    return this.objects.get(id) || null;
  }

  findAtPoint(x: number, y: number) {
    for (let i = this.objectOrder.length - 1; i >= 0; i--) {
      const obj = this.objects.get(this.objectOrder[i])!;
      if (obj.containsPoint(x, y)) return obj;
    }
    return null;
  }

  draw(context: CanvasRenderingContext2D) {
    for (const id of this.objectOrder) {
      const obj = this.objects.get(id);
      if (obj) obj.draw(context);
    }
  }
}
