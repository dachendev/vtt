import { useEffect, useRef } from "react";
import styles from "./Canvas.module.scss";
import { CanvasManager } from "../utils/CanvasManager";
import { CanvasGrid } from "../utils/CanvasGrid";
import { CanvasLayer } from "../utils/CanvasLayer";
import { CanvasToken } from "../utils/CanvasToken";

interface CanvasProps extends React.ComponentProps<"canvas"> {}

export const Canvas: React.FC<CanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasManager = new CanvasManager(canvasRef.current);

    const layer1 = new CanvasLayer("Layer 1");
    const layer2 = new CanvasLayer("Layer 2");
    canvasManager.addLayer(layer1);
    canvasManager.addLayer(layer2);

    const grid = new CanvasGrid(50, "#ccc");
    layer1.add(grid);

    const token = new CanvasToken(0, 0, 50);
    layer2.add(token);

    canvasManager.scheduleFrame(true);

    return () => {
      canvasManager.destroy();
      canvasManager.cancelFrame();
    };
  });

  return <canvas ref={canvasRef} className={styles.canvas} {...props} />;
};
