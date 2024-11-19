import styles from "./Select.module.scss";
import cn from "classnames";

interface SelectProps extends React.ComponentProps<"select"> {
  id: string;
  label: string;
  fullWidth?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  fullWidth,
  children,
  ...props
}) => {
  const selectStyles = cn(styles.select, {
    [styles.fullWidth]: fullWidth,
  });
  return (
    <div className={styles.selectContainer}>
      <select id={id} className={selectStyles} {...props}>
        {children}
      </select>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};
