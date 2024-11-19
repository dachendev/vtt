import { useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.scss";

interface CanvasProps extends React.ComponentProps<"canvas"> {}

export const Canvas: React.FC<CanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoomRef = useRef(1);
  const boundsRef = useRef({ x: 0, y: 0, width: 300, height: 300 });
  const isDraggingRef = useRef(false);

  const draw = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Failed to get CanvasRenderingContext2D");
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    const zoom = zoomRef.current;
    context.setTransform({
      a: zoom,
      d: zoom,
    });

    const bounds = boundsRef.current;
    const boundsRect = {
      top: bounds.y,
      left: bounds.x,
      bottom: bounds.y + bounds.height,
      right: bounds.x + bounds.width,
    };

    const squareSize = 50;

    context.beginPath();

    for (let x = boundsRect.left; x < boundsRect.right; x += squareSize) {
      context.moveTo(x, boundsRect.top);
      context.lineTo(x, boundsRect.bottom);
    }

    for (let y = boundsRect.top; y < boundsRect.bottom; y += squareSize) {
      context.moveTo(boundsRect.left, y);
      context.lineTo(boundsRect.right, y);
    }

    context.strokeStyle = "#ccc";
    context.stroke();
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      isDraggingRef.current = true;
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    const { movementX, movementY } = e;
    const camera = boundsRef.current;
    const zoom = zoomRef.current;

    camera.x += movementX / zoom;
    camera.y += movementY / zoom;

    draw();
  };

  const onMouseUp = () => {
    isDraggingRef.current = false;
  };

  const onMouseOut = () => {
    isDraggingRef.current = false;
  };

  const onWheelUp = () => {
    if (zoomRef.current < 2) {
      zoomRef.current += 0.1;
      draw();
    }
  };

  const onWheelDown = () => {
    if (zoomRef.current > 1) {
      zoomRef.current -= 0.1;
      draw();
    }
  };

  const onWheel = (e: WheelEvent) => {
    if (e.deltaY < 0) {
      onWheelUp();
    } else {
      onWheelDown();
    }
  };

  useEffect(() => {
    draw();

    window.addEventListener("wheel", onWheel);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      {...props}
    />
  );
};
