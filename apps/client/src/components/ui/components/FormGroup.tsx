import styles from "./FormGroup.module.scss";

interface FormGroupProps extends React.ComponentProps<"div"> {}

export const FormGroup: React.FC<FormGroupProps> = ({ children, ...props }) => {
  return (
    <div className={styles.formGroup} {...props}>
      {children}
    </div>
  );
};
