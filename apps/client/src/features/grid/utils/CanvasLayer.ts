import { DrawableObject } from "./CanvasManager";

export class CanvasLayer {
  name: string;
  objects: DrawableObject[];

  constructor(name: string) {
    this.name = name;
    this.objects = [];
  }

  addObject(object: DrawableObject) {
    this.objects.push(object);
  }

  draw(context: CanvasRenderingContext2D) {
    this.objects.forEach((obj) => obj.draw(context));
  }
}
