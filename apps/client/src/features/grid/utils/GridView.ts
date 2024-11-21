import { CanvasLayer } from "./CanvasLayer";
import { CanvasView } from "./CanvasView";
import { Grid } from "./Grid";
import { Token } from "./Token";

export class GridView extends CanvasView {
  constructor(width: number, height: number, public squareSize: number) {
    super(width, height);
    this.setup();
  }

  setup() {
    const backgroundLayer = new CanvasLayer("background");
    const objectLayer = new CanvasLayer("objects");
    this.addLayer(backgroundLayer);
    this.addLayer(objectLayer);

    const grid = new Grid(this.width, this.height, this.squareSize, "#ccc");
    backgroundLayer.add(grid);

    const token = new Token(0, 0, this.squareSize / 2);
    objectLayer.add(token);
  }
}
