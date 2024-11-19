import { useEffect, useRef } from "react";
import styles from "./Canvas.module.scss";
import { CanvasManager } from "../utils/CanvasManager";
import { Token } from "../utils/Token";
import { Grid } from "../utils/Grid";
import { CanvasLayer } from "../utils/CanvasLayer";

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

    const grid = new Grid({
      x: 0,
      y: 0,
      width: 500,
      height: 500,
      squareSize: 50,
      strokeStyle: "#ccc",
    });

    gridLayer.addObject(grid);

    const token = new Token(0, 0, 100);
    objectLayer.addObject(token);

    canvasManager.attachEvents();
    canvasManager.scheduleDraw();

    return () => canvasManager.detachEvents();
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} {...props} />;
};
