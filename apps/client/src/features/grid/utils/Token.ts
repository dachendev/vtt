import { CanvasCircle } from "./CanvasCircle";

export class Token extends CanvasCircle {
  draw(context: CanvasRenderingContext2D) {
    const centerX = this.x + this.radius;
    const centerY = this.y + this.radius;
    context.beginPath();
    context.arc(centerX, centerY, this.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }

  onMouseDown(event: Canvas.MouseEvent) {
    console.log(event.x, event.y);
  }

  setup() {
    this.subscribe("mousedown", this.onMouseDown.bind(this));
  }
}
