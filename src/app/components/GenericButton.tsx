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

/**
 * Die `GenericButton`-Komponente rendert eine Schaltfläche mit anpassbarem Text,
 * Klick-Handler, Stil, Typ, und optionalem Icon. Das Icon kann links oder rechts vom Text angezeigt werden.
 *
 * @param  title - Der Text, der auf der Schaltfläche angezeigt wird.
 * @param  onClick - Die Funktion, die beim Klicken auf die Schaltfläche aufgerufen wird.
 * @param {React.CSSProperties} [style] - Zusätzliche CSS-Stile für die Schaltfläche.
 * @param {'button' | 'submit' | 'reset'} [type='button'] - Der Typ der Schaltfläche.
 * @param {boolean} [disabled=false] - Gibt an, ob die Schaltfläche deaktiviert ist.
 * @param {React.ReactNode} [icon] - Ein optionales Icon, das auf der Schaltfläche angezeigt wird.
 * @param {'left' | 'right'} [iconPosition='left'] - Die Position des Icons relativ zum Text.
 */
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
