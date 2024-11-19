import styles from "./Button.module.scss";
import cn from "classnames";

type ButtonVariant = "primary" | "neutral";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant: ButtonVariant;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  fullWidth,
  children,
  ...props
}) => {
  const buttonClass = cn(styles.button, styles[variant], {
    [styles.fullWidth]: fullWidth,
  });

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};
