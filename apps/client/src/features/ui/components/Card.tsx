import styles from "./Card.module.scss";

interface CardProps extends React.ComponentProps<"div"> {}

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <div className={styles.card} {...props}>
      {children}
    </div>
  );
};
