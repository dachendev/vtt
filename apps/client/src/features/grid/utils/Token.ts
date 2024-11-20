import { Circle } from "./Circle";

export class Token extends Circle {
  setup() {
    this.addListener("mousedown", () => {
      console.log("clicked");
    });
  }
}
