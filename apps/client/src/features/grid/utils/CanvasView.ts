import { CanvasLayer } from "./CanvasLayer";
import { CanvasMouseEvent } from "./CanvasManager";

export class CanvasView {
  layers = new Map<string, CanvasLayer>();
  layerOrder: string[] = [];

  constructor(public width: number, public height: number) {}

  addLayer(layer: CanvasLayer) {
    this.layers.set(layer.id, layer);
    this.layerOrder.push(layer.id);
  }

  findLayerById(id: string) {
    return this.layers.get(id) || null;
  }

  findLayerByName(name: string) {
    for (const layer of this.layers.values()) {
      if (layer.name === name) return layer;
    }
    return null;
  }

  findObjectById(id: string) {
    for (const layer of this.layers.values()) {
      const obj = layer.findById(id);
      if (obj) return obj;
    }
    return null;
  }

  findAtPoint(x: number, y: number) {
    for (let i = this.layerOrder.length - 1; i >= 0; i--) {
      const layer = this.layers.get(this.layerOrder[i]);
      const obj = layer!.findAtPoint(x, y);
      if (obj) return obj;
    }
    return null;
  }

  onMouseEvent(event: CanvasMouseEvent) {
    const obj = this.findAtPoint(event.x, event.y);
    if (obj) obj.publish(event.type, event);
  }

  draw(context: CanvasRenderingContext2D) {
    this.layerOrder.forEach((id) => {
      const layer = this.layers.get(id);
      layer!.draw(context, this);
    });
  }
}
