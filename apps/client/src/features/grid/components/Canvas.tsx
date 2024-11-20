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

    const canvas = canvasRef.current;
    const canvasManager = new CanvasManager(canvas);

    const gridLayer = new CanvasLayer("grid");
    canvasManager.addLayer(gridLayer);

    const objectLayer = new CanvasLayer("objects");
    canvasManager.addLayer(objectLayer);

    const grid = new CanvasGrid(50, "#ccc");

    gridLayer.add(grid);

    const token = new CanvasToken(0, 0, 50);
    objectLayer.add(token);

    canvasManager.setup();
    canvasManager.scheduleFrame(true);

    return () => {
      canvasManager.cancelFrame();
      canvasManager.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} {...props} />;
};
