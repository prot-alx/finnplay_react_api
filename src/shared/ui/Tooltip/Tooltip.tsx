import styles from "./Tooltip.module.scss";

interface TooltipProps {
  show: boolean;
  message: string;
}

export const Tooltip = ({ show, message }: TooltipProps) => {
  if (!show) return null;
  return <div className={styles.tooltip}>{message}</div>;
};
