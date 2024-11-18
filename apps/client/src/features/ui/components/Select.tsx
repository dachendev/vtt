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
    <>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select id={id} className={selectStyles} {...props}>
        {children}
      </select>
    </>
  );
};
