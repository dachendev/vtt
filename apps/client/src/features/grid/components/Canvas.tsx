import { useEffect, useRef } from "react";
import styles from "./Canvas.module.scss";
import { CanvasManager } from "../utils/CanvasManager";
import { Grid } from "../utils/Grid";
import { CanvasLayer } from "../utils/CanvasLayer";
import { CanvasCircle } from "../utils/CanvasCircle";

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

    const grid = new Grid(0, 0, 500, 500, 50, "#ccc");

    gridLayer.addObject(grid);

    const token = new CanvasCircle(0, 0, 50);
    objectLayer.addObject(token);

    canvasManager.attachEvents();
    canvasManager.scheduleDraw();

    return () => canvasManager.detachEvents();
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} {...props} />;
};
