import { PubSub } from "./PubSub";
import { v4 as uuid } from "uuid";

export class CanvasObject extends PubSub<any> {
  id = uuid();

  constructor(public type: string) {
    super();
  }

  inBounds(x: number, y: number) {
    return false;
  }

  draw(context: CanvasRenderingContext2D) {}
}
