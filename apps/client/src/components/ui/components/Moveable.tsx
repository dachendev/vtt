import { useEffect, useRef, useState } from "react";
import styles from "./Moveable.module.scss";
import cn from "classnames";

interface MoveableProps extends React.ComponentProps<"div"> {}

export const Moveable: React.FC<MoveableProps> = ({ children }) => {
  const [isPressed, setIsPressed] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement>(null);

  const onHandlePressed = () => {
    setIsPressed(true);
    if (divRef.current) {
      divRef.current.style.userSelect = "none";
    }
  };

  const onMouseUp = () => {
    setIsPressed(false);
    if (divRef.current) {
      divRef.current.style.userSelect = "auto";
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isPressed || !divRef.current) return;

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
  }, [isPressed]);

  const moveableStyles = cn(styles.moveable, {
    [styles.isPressed]: isPressed,
  });

  return (
    <div ref={divRef} className={moveableStyles}>
      <div
        className={styles.moveableHandle}
        onMouseDown={onHandlePressed}
      ></div>
      <div className={styles.moveableContent}>{children}</div>
    </div>
  );
};
