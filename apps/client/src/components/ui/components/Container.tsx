import styles from "./Container.module.scss";

interface ContainerProps extends React.ComponentProps<"div"> {}

export const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <div className={styles.container} {...props}>
      {children}
    </div>
  );
};
