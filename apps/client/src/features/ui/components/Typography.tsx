import React from "react";
import styles from "./Typography.module.scss";

type TypographyVariant = "h1" | "h2" | "body";

interface TypographyProps {
  variant: TypographyVariant;
  as: React.ElementType<any>;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  as: Component,
  children,
  ...props
}) => {
  return (
    <Component className={styles[variant]} {...props}>
      {children}
    </Component>
  );
};
