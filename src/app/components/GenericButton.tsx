"use client";
import styles from "@styles/components/generic-button.module.scss";

type GenericButtonProps = {
  title: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;           
  iconPosition?: 'left' | 'right';  
  classname?: string;
  runAnimation?: boolean;         
};

/**
 * Die `GenericButton`-Komponente rendert eine Schaltfläche mit anpassbarem Text,
 * Klick-Handler, Stil, Typ, und optionalem Icon. Das Icon kann links oder rechts vom Text angezeigt werden.
 *
 * @param  title - Der Text, der auf der Schaltfläche angezeigt wird.
 * @param  onClick - OPTIONAL: Die Funktion, die beim Klicken aufgerufen wird.
 * @param  style - Zusätzliche CSS-Stile für die Schaltfläche.
 * @param  type  - Der Typ der Schaltfläche [type='button'].
 * @param  disabled - Gibt an, ob die Schaltfläche deaktiviert ist.
 * @param  icon - Ein optionales Icon, das auf der Schaltfläche angezeigt wird.
 * @param  iconPosition - Die Position des Icons relativ zum Text.
 * @param  classname - Zusätzliche CSS-Klassen für die Schaltfläche.
 * @param  runAnimation - Flag, um eine Animation beim Klicken zu starten.
 */
export default function GenericButton({
  title,
  onClick,
  style,
  type = 'button',
  disabled = false,
  icon,
  iconPosition = 'left',
  classname = styles.genericButton,
  runAnimation = false,
}: GenericButtonProps) {

  return (
    <button
      type={type}
      className={`${classname}${runAnimation ? ` ${styles.runAnimation}` : ''}`}
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
