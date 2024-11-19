import { useEffect, useRef, useState } from "react";
import styles from "./Draggable.module.scss";
import cn from "classnames";

interface DraggableProps extends React.ComponentProps<"div"> {}

export const Draggable: React.FC<DraggableProps> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || !divRef.current) return;

    const { movementX, movementY } = e;
    const position = positionRef.current;
    const div = divRef.current;

    if (movementX !== 0 || movementY !== 0) {
      position.x += movementX;
      position.y += movementY;

      div.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDragging]);

  const draggableStyles = cn(styles.draggable, {
    [styles.isPressed]: isDragging,
  });

  return (
    <div ref={divRef} className={draggableStyles}>
      <div className={styles.moveableHandle} onMouseDown={onMouseDown}></div>
      <div className={styles.moveableContent}>{children}</div>
    </div>
  );
};
