"use client";
import styles from "@styles/components/generic-button.module.scss";

type GenericButtonProps = {
  title: string;
  onClick: () => void;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode; // Optionales Icon (z.B. <MyIcon />)
  iconPosition?: 'left' | 'right'; // Optional: Icon links oder rechts vom Text
};

export default function GenericButton({
  title,
  onClick,
  style,
  type = 'button',
  disabled = false,
  icon,
  iconPosition = 'left',
}: GenericButtonProps) {

  return (
    <button
      type={type}
      className={styles.genericButton}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && (
        <span >
          {icon}
        </span>
      )}
      {title}
      {icon && iconPosition === 'right' && (
        <span>
          {icon}
        </span>
      )}
    </button>
  );
}
