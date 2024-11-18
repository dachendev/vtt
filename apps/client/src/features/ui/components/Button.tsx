import styles from "./Button.module.scss";
import cn from "classnames";

interface ButtonProps extends React.ComponentProps<"button"> {
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  fullWidth,
  children,
  ...props
}) => {
  const buttonClass = cn(styles.button, {
    [styles.fullWidth]: fullWidth,
  });

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};
