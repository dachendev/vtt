import { CanvasObject } from "./CanvasObject";

export class CanvasLayer {
  name: string;
  objects: CanvasObject[];

  constructor(name: string) {
    this.name = name;
    this.objects = [];
  }

  addObject(object: CanvasObject) {
    this.objects.push(object);
  }

  draw(context: CanvasRenderingContext2D) {
    this.objects.forEach((obj) => obj.draw(context));
  }
}
