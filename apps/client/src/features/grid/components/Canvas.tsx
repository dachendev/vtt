import { useEffect, useRef } from "react";
import styles from "./Canvas.module.scss";
import { CanvasManager } from "../utils/CanvasManager";
import { Token } from "../utils/Token";
import { Grid } from "../utils/Grid";

interface CanvasProps extends React.ComponentProps<"canvas"> {}

export const Canvas: React.FC<CanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasManager = new CanvasManager(canvas);

    const setupCanvas = () => {
      canvasManager.attachEvents();

      const grid = new Grid({
        x: 0,
        y: 0,
        width: 500,
        height: 500,
        squareSize: 50,
        strokeStyle: "#ccc",
      });

      canvasManager.addObject(grid);

      const token = new Token(0, 0, 100);
      canvasManager.addObject(token);

      canvasManager.scheduleDraw();
    };

    setupCanvas();

    return () => canvasManager.detachEvents();
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} {...props} />;
};
