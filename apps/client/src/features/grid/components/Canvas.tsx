import { useEffect, useRef } from "react";
import styles from "./Canvas.module.scss";
import { CanvasManager } from "../utils/CanvasManager";
import { CanvasGrid } from "../utils/CanvasGrid";
import { CanvasLayer } from "../utils/CanvasLayer";
import { CanvasToken } from "../utils/CanvasToken";
import { CanvasView } from "../utils/CanvasView";

interface CanvasProps extends React.ComponentProps<"canvas"> {}

export const Canvas: React.FC<CanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasManager = new CanvasManager(canvas);

    const view = new CanvasView(1000, 1000);
    canvasManager.activeView = view;

    const backgroundLayer = new CanvasLayer("background");
    const objectLayer = new CanvasLayer("objects");
    view.addLayer(backgroundLayer);
    view.addLayer(objectLayer);

    const grid = new CanvasGrid(100, "#ccc");
    backgroundLayer.add(grid);

    const token = new CanvasToken(0, 0, 50);
    objectLayer.add(token);

    canvasManager.scheduleFrame(true);

    const fitCanvasToWindow = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvasManager.isDirty = true;
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
