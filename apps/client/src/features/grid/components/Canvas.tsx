import { useEffect, useRef } from "react";
import styles from "./Canvas.module.scss";
import { CanvasManager } from "../utils/CanvasManager";
import { GridView } from "../utils/GridView";

interface CanvasProps extends React.ComponentProps<"canvas"> {}

export const Canvas: React.FC<CanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasManager = new CanvasManager(canvas);

    const activeView = new GridView(500, 500, 50);
    canvasManager.activeView = activeView;

    canvasManager.scheduleFrame(true);

    const fitCanvasToWindow = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvasManager.needsRedraw = true;
    };

    fitCanvasToWindow();

    window.addEventListener("resize", fitCanvasToWindow);

    return () => {
      canvasManager.destroy();
      canvasManager.cancelFrame();
      window.removeEventListener("resize", fitCanvasToWindow);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} {...props} />;
};
