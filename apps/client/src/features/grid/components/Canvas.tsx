import { useEffect, useRef } from "react";
import styles from "./Canvas.module.scss";
import { CanvasManager } from "../utils/CanvasManager";
import { Grid } from "../utils/Grid";
import { CanvasLayer } from "../utils/CanvasLayer";
import { Token } from "../utils/Token";

interface CanvasProps extends React.ComponentProps<"canvas"> {}

export const Canvas: React.FC<CanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasManager = new CanvasManager(canvas);

    const gridLayer = new CanvasLayer("grid");
    canvasManager.appendLayer(gridLayer);

    const objectLayer = new CanvasLayer("objects");
    canvasManager.appendLayer(objectLayer);

    const grid = new Grid(0, 0, 500, 500, 50, "#ccc");

    gridLayer.appendObject(grid);

    const token = new Token(0, 0, 50);
    objectLayer.appendObject(token);

    canvasManager.setup();
    canvasManager.scheduleDraw();

    return () => canvasManager.destroy();
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} {...props} />;
};
