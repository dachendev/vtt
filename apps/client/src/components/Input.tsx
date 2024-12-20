import styles from "./Input.module.scss";
import cn from "classnames";

interface InputProps extends React.ComponentProps<"input"> {
  id: string;
  label: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  fullWidth,
  ...props
}) => {
  const inputStyles = cn(styles.input, {
    [styles.fullWidth]: fullWidth,
  });

  return (
    <div className={styles.inputContainer}>
      <input id={id} className={inputStyles} {...props} />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};
